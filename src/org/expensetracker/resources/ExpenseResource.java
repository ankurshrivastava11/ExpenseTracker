package org.expensetracker.resources;

import java.time.LocalDateTime;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.expensetracker.dao.ExTrackerDaoImpl;
import org.expensetracker.models.Expense;
import org.expensetracker.models.User;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Path("v1")
public class ExpenseResource {

	@GET
	@Path("/about")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN })
	public String about() throws Exception {
		return "about";
	}

	@POST
	@Path("/expenses")
	@Consumes({ MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN })
	public Response createExpense(String ex) throws Exception {
		System.out.println("payload " + ex);

		ObjectMapper ob = new ObjectMapper();
		Expense exp = ob.readValue(ex, Expense.class);

		int expense_id = new ExTrackerDaoImpl().createExpense(exp);
 
//		ObjectNode objNode = new ObjectMapper().createObjectNode().put("expense_id", expense_id);
//		System.out.println(expense_id);
		if (expense_id == 1) {
			System.out.println("Inside If");
			return Response.status(201).build();
		} else {
			return Response.serverError().entity("Unexpected error while creating an expense").build();
		}
	}

	/*
	 * 
	 * sample body {"email":"fasdfa", "admin":true}
	 */
	@DELETE
	@Path("/expenses/{id}")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN })
	public Response deleteExpense(@PathParam("id") int expenseId) throws Exception {
		System.out.println("expense id " + expenseId);
		int row = new ExTrackerDaoImpl().deleteExpense(expenseId);

		if (row == 1) {
			return Response.status(200).build();
		} else {
			return Response.serverError().entity("Unexpected error while deleting an expense").build();
		}
	}

	@POST
	@Path("/expenses/update")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN })
	public int updateExpense(String ex) throws Exception {
		System.out.println("payload " + ex);

		ObjectMapper ob = new ObjectMapper();
		Expense exp = ob.readValue(ex, Expense.class);

		int row = new ExTrackerDaoImpl().updateExpenses(exp);

		if (row == 1) {
			return row;
		} else {
			throw new RuntimeException();
		}
	}

	/*
	 * sample request(url) /expenses?email=test@test.com&admin=true
	 */
	@GET
	@Path("/expenses")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN })
	public String getExpense(@QueryParam("email") String email, @QueryParam("admin") boolean isAdmin) throws Exception {
		System.out.println("user email " + email);
		List<Expense> exps = new ExTrackerDaoImpl().getExpense(email, isAdmin);
		String jsonString = new ObjectMapper().writeValueAsString(exps);
		return jsonString;
	}

	/*
	 * , @Context HttpServletRequest request add if required
	 */
	@POST
	@Path("/users/auth")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN })
	public Response authenticate(String auth) throws Exception {
		System.out.println("here " + auth);
		ObjectMapper op = new ObjectMapper();

		User credentialJson = op.readValue(auth, User.class);

		User validUser = new ExTrackerDaoImpl().userAuthenticate(credentialJson.getEmail(),
				credentialJson.getPassword());

		if (validUser != null) {
//			HttpSession session = request.getSession();
//			session.setAttribute("email", validUser.getEmail());
//			session.setAttribute("designation", validUser.getDesignation());
			return Response.status(200).entity(new ObjectMapper().writeValueAsString(validUser)).type(MediaType.APPLICATION_JSON).build();
		} else {
			return Response.status(401).entity(new ObjectMapper().writeValueAsString("unauthorzied")).type(MediaType.APPLICATION_JSON).build();
		}

	}

	@POST
	@Path("/expenses/range")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces({ MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN })
	public String getExpenseReport(String cr) throws Exception {
		System.out.println("report criteria " + cr);
		ObjectMapper op = new ObjectMapper();
		JsonNode repJs = op.readValue(cr, JsonNode.class);
		System.out.println("user json " + repJs);
		List<Expense> exps = new ExTrackerDaoImpl().dateTimeRangeExpenses(repJs.get("email").asText(),
				repJs.get("start_dt").asText(), repJs.get("end_dt").asText());
		String jsonString = new ObjectMapper().writeValueAsString(exps);
		return jsonString;
	}
}
