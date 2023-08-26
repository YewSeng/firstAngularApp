package Pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AddAdminPage {

    private WebDriver driver;
    private WebDriverWait wait;

    public AddAdminPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10); // Adjust the wait timeout as needed
    }

    public void navigateTo() {
        driver.get("http://localhost:4200/hidden");
    }

    public void enterSecretCode(String code) {
        WebElement enterCodeField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("enterCode")));
        enterCodeField.sendKeys(code);
    }

    public void togglePasswordVisibility() {
        WebElement showPasswordCheckbox = wait.until(ExpectedConditions.elementToBeClickable(By.id("showPassword")));
        showPasswordCheckbox.click();
    }

    public void enterAdminDetails(String name, String username, String password) {
        WebElement fNameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("fName")));
        WebElement userField = driver.findElement(By.id("user"));
        WebElement passwordField = driver.findElement(By.id("password"));

        fNameField.sendKeys(name);
        userField.sendKeys(username);
        passwordField.sendKeys(password);
        driver.findElement(By.id("showPassword")).click();
    }

    public void clickRegisterButton() {
    	driver.findElement(By.id("register")).click();
    }

    public String getAlertText() {
        Alert alert = driver.switchTo().alert();
        String alertText = alert.getText();
        alert.accept(); // Close the alert
        return alertText;
    }

    public void closeBrowser() {
        driver.quit();
    }
}
