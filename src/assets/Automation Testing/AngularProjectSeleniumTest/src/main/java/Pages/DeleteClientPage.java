package Pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeleteClientPage {

	 private WebDriver driver;
	 private WebDriverWait wait;
	  
	 public DeleteClientPage(WebDriver driver) {
		 this.driver = driver;
	     this.wait = new WebDriverWait(driver, 10); // Adjust the wait timeout as needed
	 }
	 
	 public void navigateToHome() {
	      driver.get("http://localhost:4200/home");
	 }

	 public String adminLogin(String username, String password) {
	      WebElement userTypeDropdown = driver.findElement(By.id("userType"));
	      userTypeDropdown.click();

	      WebElement adminOption = driver.findElement(By.cssSelector("option[value='admin']"));
	      adminOption.click();

	      WebElement usernameInput = driver.findElement(By.id("username"));
	      WebElement passwordInput = driver.findElement(By.id("password"));
	      WebElement showPassword = driver.findElement(By.id("showPassword"));
	      WebElement loginButton = driver.findElement(By.cssSelector("button[type='submit']"));

	      usernameInput.sendKeys(username);
	      passwordInput.sendKeys(password);
	      showPassword.click();
	      loginButton.click();

	      // Assuming successful navigation to the admin dashboard
	      WebDriverWait wait = new WebDriverWait(driver, 10);
	      WebElement adminDashboardTitle = driver.findElement(By.tagName("h1"));
	      String titleText = adminDashboardTitle.getText();
	      return titleText;
	 }

	 public void goToViewClientsPage() {
	      driver.findElement(By.id("viewClient")).click();
	 }

	 public void deleteClient(String username) {
	      // Find the button that leads to the delete client page and click it
	      driver.findElement(By.xpath("//button[contains(text(), 'Delete Client')]")).click();
	        
	      // Simulate clicking the "OK" button in the confirmation dialog
	      driver.switchTo().alert().accept();
	 }

	 public void adminLogsOut() {
	      // Find the logout button element and perform the logout action
	      WebElement logoutButton = driver.findElement(By.cssSelector(".btn-outline-success"));
	      logoutButton.click();
	        
	      // Assuming successful navigation to the logout page
	      WebDriverWait wait = new WebDriverWait(driver, 10);
	      wait.until(ExpectedConditions.titleContains("Logout")); // Wait until the logout page title is detected
	 }
	    
	 public String attemptToLoginToDeletedClientAccount(String username, String password) {
	    WebElement userTypeDropdown = driver.findElement(By.id("userType"));
	    userTypeDropdown.click();

	    WebElement adminOption = driver.findElement(By.cssSelector("option[value='client']"));
	    adminOption.click();

	    WebElement usernameInput = driver.findElement(By.id("username"));
	    WebElement passwordInput = driver.findElement(By.id("password"));
	    WebElement showPassword = driver.findElement(By.id("showPassword"));
	    WebElement loginButton = driver.findElement(By.cssSelector("button[type='submit']"));

	    usernameInput.sendKeys(username);
	    passwordInput.sendKeys(password);
	    showPassword.click();
	    loginButton.click();
	        
	    Alert alert = driver.switchTo().alert();
	    String text = alert.getText();
	    alert.accept(); 
	    return text;
	}
	    
	public void closeBrowser() {
	    driver.quit();
	}
	    
}
