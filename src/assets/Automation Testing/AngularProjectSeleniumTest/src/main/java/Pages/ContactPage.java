package Pages;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ContactPage {

    private WebDriver driver;
    private WebDriverWait wait;
    
    public ContactPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, 10); // Adjust the wait timeout as needed
    }
	
    public void navigateToContactPage() {
        driver.get("http://localhost:4200/contact-us");
    }
    
    public String enterContactDetails(String name, String email, String enquiries) {
    	WebElement nameField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("name")));
        WebElement emailField = driver.findElement(By.id("email"));
        WebElement enquiriesField = driver.findElement(By.id("request"));

        nameField.sendKeys(name);
        emailField.sendKeys(email);
        enquiriesField.sendKeys(enquiries);
        driver.findElement(By.id("submit")).click();
        
        Alert alert = driver.switchTo().alert();
	    String text = alert.getText();
	    alert.accept(); 
	    return text;
    }
    
	public void closeBrowser() {
	    driver.quit();
	}
	    
}
