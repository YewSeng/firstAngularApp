package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ClientUpdateMeetingPage {

    private WebDriver driver;
    private WebDriverWait wait;
    
    public ClientUpdateMeetingPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10); // Adjust the wait timeout as needed
    }
    
    public void navigateToHome() {
        driver.get("http://localhost:4200/home");
    }

    public String clientLogin(String username, String password) {
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
        WebElement adminDashboardTitle = driver.findElement(By.tagName("h1"));
        String titleText = adminDashboardTitle.getText();
        return titleText;
    }

    public void goToViewMeetingPage() {
        driver.findElement(By.id("viewMeeting")).click();
    }
    
    public void  goToUpdateMeetingPage() {
        // Find the button that leads to the update client page and click it
        driver.findElement(By.xpath("//button[contains(text(), 'Edit Meeting')]")).click();
    }
    
    public void editMeeting(String topic, String startDate, String startTime, String endDate, String endTime, String parties) {
    	goToUpdateMeetingPage();

        WebElement topicInput = driver.findElement(By.id("topic"));
        WebElement startDateInput = driver.findElement(By.id("startdate"));
        WebElement startTimeInput = driver.findElement(By.id("starttime"));
        WebElement endDateInput = driver.findElement(By.id("enddate"));
        WebElement endTimeInput = driver.findElement(By.id("endtime"));
        WebElement partiesInput = driver.findElement(By.id("parties")); // Added input for Parties Involved
        WebElement createButton = driver.findElement(By.cssSelector("button[type='button']"));

        // Fill in the form fields
        topicInput.sendKeys(topic);
        startDateInput.sendKeys(startDate);
        startTimeInput.sendKeys(startTime);
        endDateInput.sendKeys(endDate);
        endTimeInput.sendKeys(endTime);
        partiesInput.sendKeys(parties); // Fill in the Parties Involved input

        // Assuming other interactions such as selecting clients and performing validations

        createButton.click();    	
    }
    
    public String getAlertMessage() {
        // Wait for the alert to appear
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.alertIsPresent());

        // Get the text of the alert
        String alertMessage = driver.switchTo().alert().getText();

        // Accept the alert
        driver.switchTo().alert().accept();

        return alertMessage;
    }
    
    public void closeBrowser() {
        driver.quit();
    }
}