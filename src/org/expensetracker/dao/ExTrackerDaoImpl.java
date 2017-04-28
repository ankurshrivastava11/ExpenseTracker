package org.expensetracker.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.expensetracker.models.Expense;
import org.expensetracker.models.User;

public class ExTrackerDaoImpl {
	
	private Connection con;
	public ExTrackerDaoImpl(Connection con) {
		super();
		this.con = con;
	}

	public ExTrackerDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	@SuppressWarnings("deprecation")
	public int createExpense(Expense expense) throws Exception {
		con = DBConnection.emergencycon();

		PreparedStatement st;
		st = (PreparedStatement) con
				.prepareStatement("insert into Expense(DateTime,Amount,Details,Email) values(?,?,?,?)");

		st.setTimestamp(1, Timestamp
				.valueOf(LocalDateTime.parse(expense.getDt(), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"))));
		st.setDouble(2, expense.getAmount());
		st.setString(3, expense.getExDesc());
		st.setString(4, expense.getEmail());

		System.out.println("User email is: " + expense.getEmail());
		int i = st.executeUpdate();

		System.out.println("------rows inserted--------" + i);
		return i;
	}

	@SuppressWarnings("deprecation")
	public int deleteExpense(int expenseId) throws Exception {
		con = DBConnection.emergencycon();
		PreparedStatement st;
		st = (PreparedStatement) con.prepareStatement("delete FROM Expense where ExpenseId = ?");
		st.setInt(1, expenseId);
		int i = st.executeUpdate();

		System.out.println("------rows deleted--------" + i);
		return i;
	}

	@SuppressWarnings("deprecation")
	public int updateExpenses(Expense expense) throws Exception {
		con = DBConnection.emergencycon();

		PreparedStatement st;
		st = (PreparedStatement) con.prepareStatement(
				"update Expense set DateTime = ?,Amount = ?,Details = ?,Email = ? where ExpenseId = ?");

		st.setTimestamp(1, Timestamp
				.valueOf(LocalDateTime.parse(expense.getDt(), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"))));
		st.setDouble(2, expense.getAmount());
		st.setString(3, expense.getExDesc());
		st.setString(4, expense.getEmail());
		st.setInt(5, expense.getId());

		System.out.println("User email is: " + expense.getEmail());
		int i = st.executeUpdate();

		System.out.println("------rows inserted--------" + i);
		return i;
	}

	public List<Expense> getExpense(String email, boolean isAdmin) throws Exception {
		con = DBConnection.emergencycon();

		PreparedStatement st;
		
		if(isAdmin) {
			st = (PreparedStatement) con.prepareStatement("select * from Expense");
		} else {
			st = (PreparedStatement) con.prepareStatement("select * from Expense where Email = ?");
			st.setString(1, email);
		}

		ResultSet rs = st.executeQuery();

		List<Expense> expenses = new ArrayList<Expense>();

		while (rs.next()) {
			Expense ex1 = new Expense();
			ex1.setAmount(rs.getDouble("Amount"));
			ex1.setDt(rs.getTimestamp("DateTime").toLocalDateTime().toString());
			ex1.setEmail(rs.getString("Email"));
			ex1.setExDesc(rs.getString("Details"));
			ex1.setId(Integer.parseInt(rs.getString("ExpenseId")));

			expenses.add(ex1);
		}

		System.out.println("------expenses found size--------" + expenses.size());
		return expenses;
	}

	public User userAuthenticate(String email, String pass) throws Exception {
		con = DBConnection.emergencycon();

		PreparedStatement st = (PreparedStatement) con
				.prepareStatement("select * from Credentials where Email=? and Password=?");
		st.setString(1, email);
		st.setString(2, pass);

		ResultSet rs = st.executeQuery();

		if (rs.next()) {
			User user = new User();
			user.setEmail(rs.getString("Email"));
			user.setAdmin(rs.getBoolean("isAdmin"));
			return user;
		}
		return null;
	}

	public List<Expense> dateTimeRangeExpenses(String email, String startDateTime, String endDateTime)
			throws Exception {
		con = DBConnection.emergencycon();

		PreparedStatement st = (PreparedStatement) con
				.prepareStatement("select * from Expense where Email=? and DateTime >= ? and DateTime <= ?");
		st.setString(1, email);
		st.setTimestamp(2,
				Timestamp.valueOf(LocalDateTime.parse(startDateTime, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"))));
		st.setTimestamp(3,
				Timestamp.valueOf(LocalDateTime.parse(endDateTime, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm"))));

		ResultSet rs = st.executeQuery();

		List<Expense> expenses = new ArrayList<Expense>();

		while (rs.next()) {
			Expense ex1 = new Expense();
			ex1.setAmount(rs.getDouble("Amount"));
			ex1.setDt(rs.getTimestamp("DateTime").toLocalDateTime().toString());
			ex1.setEmail(rs.getString("Email"));
			ex1.setExDesc(rs.getString("Details"));

			expenses.add(ex1);
		}

		System.out.println("------expenses found size--------" + expenses.size());
		return expenses;
	}
}