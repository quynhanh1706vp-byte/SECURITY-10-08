using System.Data.SqlClient;
class P { static void Main(){ var name="admin"; var cmd=new SqlCommand($"select * from Users where name='{name}'"); } }
