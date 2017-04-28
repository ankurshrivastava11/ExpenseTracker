package org.expensetracker.dao;

import java.sql.*;
import java.sql.DriverManager;

public class DBConnection {
	
static Connection con;
  
        
    
    static
    {
            try
        {
        Class.forName("com.mysql.jdbc.Driver");
        con=DriverManager.getConnection("jdbc:mysql://localhost:3306/ExpenseTrackerSchema","root","root");
         } 
        catch(Exception e)
        {
        e.printStackTrace();
        }
    }

    public static Connection emergencycon() throws Exception 
    {
                if(con.isClosed())
                {
                    con=DriverManager.getConnection("jdbc:mysql://localhost:3306/ExpenseTrackerSchema","root","root");
                   
                }
           return con;
    }

}
