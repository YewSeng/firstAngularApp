package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class UpdateClientPage {

    private WebDriver driver;
    private WebDriverWait wait;

    public UpdateClientPage(WebDriver driver) {
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

    public void goToUpdateClientsPage() {
        // Find the button that leads to the update client page and click it
        driver.findElement(By.xpath("//button[contains(text(), 'Edit Client')]")).click();
    }

    public void updateClientDetails(String clientName, String email, String address, String postalCode, String username, String password) {
        WebElement clientNameField = driver.findElement(By.id("fName"));
        WebElement emailField = driver.findElement(By.id("email"));
        WebElement addressField = driver.findElement(By.id("address"));
        WebElement postalCodeField = driver.findElement(By.id("postalCode"));
        WebElement usernameField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("password"));

        clientNameField.sendKeys(clientName);
        emailField.sendKeys(email);
        addressField.sendKeys(address);
        postalCodeField.sendKeys(postalCode);
        usernameField.sendKeys(username);
        passwordField.sendKeys(password);
        driver.findElement(By.id("showPassword")).click();
    }
    
    public void clickUpdateClientButton() {
        driver.findElement(By.className("btn-warning")).click(); 
    }
    
    public String getAlertText() {
        return driver.switchTo().alert().getText();
    }
    
    public void adminLogsOut() {
        // Find the logout button element and perform the logout action
        WebElement logoutButton = driver.findElement(By.cssSelector(".btn-outline-success"));
        logoutButton.click();
        
        // Assuming successful navigation to the logout page
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.titleContains("Logout")); // Wait until the logout page title is detected
    }
    
    public String verifyUpdatedClientLogin(String username, String password) {
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
            
        // Assuming successful navigation to the client dashboard
        WebDriverWait wait = new WebDriverWait(driver, 10);
        WebElement clientDashboardTitle = driver.findElement(By.tagName("h1"));
        String titleText = clientDashboardTitle.getText();
        return titleText;
    }
    
    public String getClientDashboardTitle() {
        // Find the client dashboard title element and get its text
        WebElement clientDashboardTitle = driver.findElement(By.tagName("h1"));
        return clientDashboardTitle.getText();
    }
    
    public void closeBrowser() {
        driver.quit();
    }

}

