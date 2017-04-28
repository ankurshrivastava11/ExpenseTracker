package org.expensetracker.resources;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.expensetracker.dao.DBConnection;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import junit.framework.Assert;

public class DBConnectionTest {
	@InjectMocks private DBConnection dbConnection;
	@Mock private Connection mockConnection;
	@Mock private Statement mockStatement;
	
	@Before
	public void setUp() throws SQLException {
		dbConnection=(DBConnection) DriverManager.getConnection("jdbc:mysql://localhost:3306/ExpenseTrackerSchema","root","root");
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testMockDBConnection() throws Exception {	
		Mockito.when(mockConnection.createStatement()).thenReturn(mockStatement);
		Mockito.when(mockConnection.createStatement().executeUpdate(Mockito.any())).thenReturn(1);
		Connection conn = dbConnection.emergencycon();
		Assert.assertNotNull(conn);
		Mockito.verify(mockConnection.createStatement(), Mockito.times(1));
	}
}
