using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using SmartFridge.Models;
using System.Text;

namespace SmartFridge.Models
{
    public class DBUsersRepository : IUsersRepository
    {
        private static string _connectionString;    // "Server=DESKTOP-U1KKR9S\\SQLEXPRESS;Database=FridgeDB;Trusted_Connection=True;";
        private static IHostingEnvironment _environment;
        private readonly string _insertQuery = "INSERT INTO Users ([Username], [Salt], [HashedPassword]) OUTPUT INSERTED.ID VALUES(@param1,@param2,@param3)";
        private readonly string _selectQuery = "SELECT Salt, HashedPassword FROM Users WHERE Username = @param1";

        public DBUsersRepository(IConfiguration configuration, IHostingEnvironment environment)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
            _environment = environment;
        }

        public async Task<int> RegisterAsync(UserDTO user)
        {
            int createdId = 0;

            var salt = HashHelper.CreateSalt(8);
            var hashedPassword = HashHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(user.Password), salt);

            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = _insertQuery;
                cmd.Parameters.AddWithValue("@param1", user.Username);
                cmd.Parameters.AddWithValue("@param2", salt);
                cmd.Parameters.AddWithValue("@param3", hashedPassword);
                try
                {
                    connection.Open();
                    createdId = Convert.ToInt32(await cmd.ExecuteScalarAsync());
                    Console.WriteLine("CreatedID: " + createdId);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message.ToString(), "Error Message");
                }
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }

            return createdId;
        }

        public async Task<bool> LoginAsync(UserDTO user)
        {
            Console.WriteLine("Loginasync: repo: ");
            bool isSuccess = false;
            byte[] salt;
            byte[] hashedPass;

            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = _selectQuery;
                cmd.Parameters.AddWithValue("@param1", user.Username);
                try
                {
                    connection.Open();
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            salt = (byte[])reader["Salt"];
                            hashedPass = (byte[])reader["HashedPassword"];
                            var hashEnteredPassword = HashHelper.GenerateSaltedHash(Encoding.UTF8.GetBytes(user.Password), salt);
                            Console.WriteLine("Poprawne haslo: " + Convert.ToBase64String(hashedPass));
                            Console.WriteLine("Wpisane haslo: " + Convert.ToBase64String(hashEnteredPassword));
                            if (hashEnteredPassword.SequenceEqual(hashedPass))
                                isSuccess = true;
                        }
                        else
                        {
                            Console.WriteLine("No rows found.");
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message.ToString(), "Error Message");
                }

                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }

            Console.WriteLine("IsSucces from repo: " + isSuccess);
            return isSuccess;
        }
    }
}
