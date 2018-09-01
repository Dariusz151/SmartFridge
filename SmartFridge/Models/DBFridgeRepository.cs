using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;

namespace SmartFridge.Models
{
    public class DBFridgeRepository : ISmartFridgeRepository
    {
        private static string _connectionString;    // "Server=DESKTOP-U1KKR9S\\SQLEXPRESS;Database=FridgeDB;Trusted_Connection=True;";
        private static IHostingEnvironment _environment;
        private readonly string _selectAllQuery = "SELECT [ID], [ArticleName], [Quantity], [Weight] FROM Articles";
        private readonly string _selectByIdQuery = "SELECT [ID], [ArticleName], [Quantity], [Weight] FROM Articles WHERE ID=@id";
        private readonly string _insertQuery = "INSERT INTO Articles ([ID], [ArticleName], [Quantity], [Weight], Recipients, Text) OUTPUT INSERTED.ID VALUES(@param1,@param2,@param3,@param4)";


        //private readonly string _selectQuery = "SELECT [Tag[cTD]]], [Check point time], [Threshold value], Direction, Recipients, Text, ID FROM ProvisionsList WHERE ID=@id";
        //private readonly string _insertQuery = "INSERT INTO ProvisionsList ([Tag[cTD]]], [Check point time], [Threshold value], Direction, Recipients, Text) OUTPUT INSERTED.ID VALUES(@param1,@param2,@param3,@param4,@param5,@param6)";
        //private readonly string _deleteQuery = "DELETE FROM ProvisionsList WHERE ID=@id";
        //private readonly string _updateQuery = "UPDATE ProvisionsList SET [Tag[cTD]]] = @param1, [Check point time] = @param2, [Threshold value] = @param3, Direction = @param4, Recipients = @param5, Text = @param6 WHERE ID=@id";


        public DBFridgeRepository(IConfiguration configuration, IHostingEnvironment environment)
        {
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
            _environment = environment;
        }

        public async Task<IEnumerable<FridgeItem>> GetAllAsync()
        {
            IList<FridgeItem> list = null;
            if (_environment.IsDevelopment())
                Console.WriteLine("(GetAllAsync) in DBFridgeRepos");

            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = _selectAllQuery;

                try
                {
                    Console.WriteLine("Try to open connection");
                    connection.Open();
                    Console.WriteLine("Connection.Open();");
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            list = new List<FridgeItem>();
                            while (reader.Read())
                            {
                                list.Add(new FridgeItem()
                                {
                                    ID = reader.GetInt32(0),
                                    ArticleName = reader.GetString(1),
                                    Quantity = reader.GetInt32(2),
                                    Weight = reader.GetInt32(3)
                                });
                            }
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
            return list;
        }

        public async Task<FridgeItem> GetAsync(int id)
        {
            FridgeItem item = null;
            if (_environment.IsDevelopment())
                Console.WriteLine("(GetAllAsync) in DBFridgeRepos");

            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = _selectByIdQuery;

                try
                {
                    Console.WriteLine("Try to open connection");
                    connection.Open();
                    Console.WriteLine("Connection.Open();");
                    using (SqlDataReader reader = await cmd.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            item = new FridgeItem()
                            {
                                ID = reader.GetInt32(0),
                                ArticleName = reader.GetString(1),
                                Quantity = reader.GetInt32(2),
                                Weight = reader.GetInt32(3)
                            };
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
            return item;
        }

        public async Task<int> CreateAsync(FridgeItem fridgeItem)
        {
            int createdId = 0;
            if (_environment.IsDevelopment())
                Console.WriteLine("(CreateAsync) in DBFridgeRepository ");

            using (SqlConnection connection = new SqlConnection(_connectionString))
            using (SqlCommand cmd = new SqlCommand())
            {
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = _insertQuery;
                cmd.Parameters.AddWithValue("@param1", fridgeItem.ID);
                cmd.Parameters.AddWithValue("@param2", fridgeItem.ArticleName);
                cmd.Parameters.AddWithValue("@param3", fridgeItem.Quantity);
                cmd.Parameters.AddWithValue("@param4", fridgeItem.Weight);
                try
                {
                    connection.Open();
                    createdId = Convert.ToInt32(await cmd.ExecuteScalarAsync());
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

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }
        
      
        //public async Task<bool> DeleteAsync(int id)
        //{
        //    int rowsAffected = 0;
        //    if (_environment.IsDevelopment())
        //        Console.WriteLine("(DeleteAsync) in DBProvisionRepository ");

        //    using (SqlConnection connection = new SqlConnection(_connectionString))
        //    using (SqlCommand cmd = new SqlCommand())
        //    {
        //        cmd.Connection = connection;
        //        cmd.CommandType = CommandType.Text;
        //        cmd.CommandText = _deleteQuery;

        //        cmd.Parameters.AddWithValue("@id", id);

        //        try
        //        {
        //            connection.Open();
        //            rowsAffected = await cmd.ExecuteNonQueryAsync();
        //        }
        //        catch (Exception e)
        //        {
        //            Console.WriteLine(e.Message.ToString(), "Error Message");
        //        }
        //        if (connection.State == ConnectionState.Open)
        //            connection.Close();
        //    }

        //    return rowsAffected != 0;
        //}

        //public async Task<bool> UpdateAsync(ProvisionItem item)
        //{
        //    int rowsAffected = 0;
        //    if (_environment.IsDevelopment())
        //        Console.WriteLine("(UpdateAsync) in DBProvisionRepository ");

        //    using (SqlConnection connection = new SqlConnection(_connectionString))
        //    using (SqlCommand cmd = new SqlCommand())
        //    {
        //        cmd.Connection = connection;
        //        cmd.CommandType = CommandType.Text;
        //        cmd.CommandText = _updateQuery;

        //        cmd.Parameters.AddWithValue("@param1", item.TagName);
        //        cmd.Parameters.AddWithValue("@param2", item.CheckPointTime);
        //        cmd.Parameters.AddWithValue("@param3", item.ThresholdValue);
        //        cmd.Parameters.AddWithValue("@param4", item.Direction);
        //        cmd.Parameters.AddWithValue("@param5", item.Recipients);
        //        cmd.Parameters.AddWithValue("@param6", item.Text);
        //        cmd.Parameters.AddWithValue("@id", item.ID);
        //        try
        //        {
        //            connection.Open();
        //            rowsAffected = await cmd.ExecuteNonQueryAsync();
        //        }
        //        catch (Exception e)
        //        {
        //            Console.WriteLine(e.Message.ToString(), "Error Message");
        //        }
        //        if (connection.State == ConnectionState.Open)
        //            connection.Close();

        //    }
        //    return rowsAffected != 0;
        //}



    }
}
