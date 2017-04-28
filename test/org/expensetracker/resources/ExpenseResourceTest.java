package org.expensetracker.resources;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;
import javax.ws.rs.core.Response;

import org.expensetracker.dao.DBConnection;
import org.expensetracker.dao.ExTrackerDaoImpl;
import org.expensetracker.models.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.stubbing.Answer;
import org.mockito.Mockito;
import org.mockito.internal.util.reflection.Fields;
import org.mockito.invocation.InvocationOnMock;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import sun.reflect.Reflection;

public class ExpenseResourceTest {
	private ExpenseResource expRes;
	private User user;
	private ExTrackerDaoImpl dao;
	
	@Rule
	public MockitoRule rule = MockitoJUnit.rule();

	private DBConnection conn;
	@Mock
	DataSource mockDataSource;

	@Mock
	Connection mockConn;
	@Mock
	PreparedStatement mockPreparedStmnt;
	@Mock
	ResultSet mockResultSet;
	int userId = 100;

	@Before
	public void createMocks() throws Exception {
		expRes = new ExpenseResource();
		dao = new ExTrackerDaoImpl((Connection) DBConnection.emergencycon());
		user = new User();
	}

	@After
	public void destroy() {
		expRes = null;
		user = null;
		conn = null;
	}

	@Test
	public void about() throws Exception {
		String res = expRes.about();
		assertTrue("about".equalsIgnoreCase(res));
	}

	@Ignore
	@Test
	public void validUserAuthenticate() throws Exception {
		ExTrackerDaoImpl dao = mock(ExTrackerDaoImpl.class);

		user.setEmail("test@test.com");
		user.setAdmin(false);

		when(dao.userAuthenticate(Matchers.anyString(), Matchers.anyString())).thenReturn(user);

		Response res = expRes.authenticate("\"email\":\"test@test.com\",\"password\":\"abc\"");
		assertTrue(200 == res.getStatus());
	}

	@Test
	public void invalidUserAuthenticate() throws Exception {

		// when(mockDataSource.getConnection()).thenReturn(mockConn);
		// when(mockDataSource.getConnection(Matchers.anyString(),
		// Matchers.anyString())).thenReturn(mockConn);
//		when(DBConnection.emergencycon()).thenReturn((Connection) conn);
//		Mockito.doNothing().when(mockConn).commit();
//		when(mockConn.prepareStatement(Matchers.anyString(), Matchers.anyInt())).thenReturn(mockPreparedStmnt);
//
//		Mockito.doNothing().when(mockPreparedStmnt).setString(Matchers.anyInt(), Matchers.anyString());
//		Mockito.doNothing().when(mockPreparedStmnt).setString(Matchers.anyInt(), Matchers.anyString());
//
//		when(mockPreparedStmnt.executeQuery()).thenReturn(mockResultSet);
//		// when(mockPreparedStmnt.getGeneratedKeys()).thenReturn(mockResultSet);
//		when(mockResultSet.next()).thenReturn(Boolean.TRUE, Boolean.FALSE);
//		when(mockResultSet.getString(Matchers.anyInt())).thenReturn("test@test.com");
//		when(mockResultSet.getString(Matchers.anyInt())).thenReturn("false");

		// when(obj.readValue(Matchers.eq("{\"email\":\"test@test.com\",\"password\":\"ab\"}"),
		// Matchers.any(User.class.getClass()))).thenReturn(user);
//		when(dao.userAuthenticate(Matchers.anyString(), Matchers.anyString())).thenReturn(new User());
		when(dao.userAuthenticate(Matchers.anyString(), Matchers.anyString())).thenAnswer(new Answer() {
            @Override
            public User answer(InvocationOnMock invocation) throws Throwable {
                User user = (User) invocation.getArguments()[0];
                user.setAdmin(false);
                user.setEmail("test@test.com");
                return user;
            }
        });
		Response res = expRes.authenticate("{\"email\":\"test@test.com\",\"password\":\"ab\"}");
		assertTrue(200 != res.getStatus());
	}
}
