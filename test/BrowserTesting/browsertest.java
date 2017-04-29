package BrowserTesting;

import org.junit.After;
import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.Page;

public class browsertest {

	@Test
	public void verifytitle() {
		WebDriver driver = new HtmlUnitDriver();
		driver.get("http://localhost:8080/ExpenseTrackerGigster/index.jsp");
		String title = driver.getTitle();
		Assert.assertTrue(title.contains("Tracker"));
	}

	@Test
	public void Login() {
		WebDriver driver = new HtmlUnitDriver();
		driver.get("http://localhost:8080/ExpenseTrackerGigster/index.jsp");
		WebElement username = driver.findElement(By.id("email"));
		username.sendKeys("test1@test.com");
		WebElement password = driver.findElement(By.id("password"));
		password.sendKeys("qwerty");
		WebElement loginbutton = driver.findElement(By.id("loginButton"));
		loginbutton.click();
		String title = driver.getTitle();
		Assert.assertTrue(title.contains("Tracker"));
	}

	@Test
	public void authenticateValidCredentials() {
		WebDriver driver = new HtmlUnitDriver();
		driver.get("http://localhost:8080/ExpenseTrackerGigster/index.jsp");
		WebElement username = driver.findElement(By.id("email"));
		username.sendKeys("test1@test.com");
		WebElement password = driver.findElement(By.id("password"));
		password.sendKeys("qwerty");
		WebElement loginbutton = driver.findElement(By.id("loginButton"));
		loginbutton.click();
		String page = driver.getPageSource();
		Assert.assertTrue(page.contains("Report"));
	}

	@Test
	public void authenticateInvalidCredentials() {
		WebDriver driver = new HtmlUnitDriver();
		driver.get("http://localhost:8080/ExpenseTrackerGigster/index.jsp);
		WebElement username = driver.findElement(By.id("email"));
		username.sendKeys("test1@test.com");
		WebElement password = driver.findElement(By.id("password"));
		password.sendKeys("asdg");
		WebElement loginbutton = driver.findElement(By.id("loginButton"));
		loginbutton.click();
		String page = driver.getPageSource();
		Assert.assertTrue(page.contains("Login"));
	}

	@Test
	public void viewCreatedExpense() {
		WebDriver driver = new HtmlUnitDriver();
		driver.get("http://localhost:8080/ExpenseTrackerGigster/index.jsp");
		WebElement username = driver.findElement(By.id("email"));
		username.sendKeys("test1@test.com");
		WebElement password = driver.findElement(By.id("password"));
		password.sendKeys("qwerty");
		WebElement loginbutton = driver.findElement(By.id("loginButton"));
		loginbutton.click();
		WebElement dt = driver.findElement(By.id("dateTime"));
		dt.sendKeys("04102017");
		dt.sendKeys(Keys.TAB);
		dt.sendKeys("0100AM");
		WebElement amount = driver.findElement(By.id("amount"));
		amount.sendKeys("50");
		WebElement desc = driver.findElement(By.id("description"));
		desc.sendKeys("grocery");
		WebElement createbutton = driver.findElement(By.id("createButton"));
		createbutton.click();
		WebElement expensebutton = driver.findElement(By.id("view-expenses-li"));
		expensebutton.click();
		WebElement view = driver.findElement(By.id("viewExpensesButton"));
		view.click();
		JavascriptExecutor javascript = (JavascriptExecutor) driver;
		String page=(String)javascript.executeScript("return document.pageSource"); 
		Assert.assertTrue(page.contains("grocery") && page.contains("50"));

	}

	@Test
	public void report()
	{
		WebDriver driver = new HtmlUnitDriver();
		driver.get("http://localhost:8080/ExpenseTrackerGigster/index.jsp");
		WebElement username = driver.findElement(By.id("email"));
		username.sendKeys("test1@test.com");
		WebElement password = driver.findElement(By.id("password"));
		password.sendKeys("qwerty");
		WebElement loginbutton = driver.findElement(By.id("loginButton"));
		loginbutton.click();
		System.out.println("here2s");
		WebElement reportli = driver.findElement(By.id("report-li"));
		System.out.println("here3");
		reportli.click();
		System.out.println("here");
		WebElement weekly = driver.findElement(By.id("weeklyButton"));
		weekly.click();
		System.out.println("here1");
		String page = driver.getPageSource();
		System.out.println(page);
		
	}
}
