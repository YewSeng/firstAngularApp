package stepdefinitions;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.AddAdminPage;
import io.cucumber.java.ParameterType;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class AddAdminSteps {

    private WebDriver driver;
    private AddAdminPage add;

    @ParameterType(".*") // This captures any string as a parameter
    public String anyString(String value) {
        return value;
    }

    @Given("the {anyString} is on the hidden page")
    public void navigateToHiddenPage(String role) {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\TanYe\\Downloads\\chromedriver-win32\\chromedriver-win32\\chromedriver.exe");
        driver = new ChromeDriver();
        add = new AddAdminPage(driver);
        add.navigateTo();
    }

    @When("the {anyString} enters secret key correctly")
    public void adminEntersSecretKey(String role) {
        add.enterSecretCode("a4bb4e0e-8414-498c-be06-ec9e65293bf5");
    }

    @When("the {anyString} enters the details according to the formValidation requirements")
    public void enterAdminDetails(String role) {
    	add.enterAdminDetails("Anna Tan (Test)", "Anna Tan (Test)", "A@12345678");
        add.togglePasswordVisibility(); // Make sure to toggle password visibility
        add.clickRegisterButton(); // Click the Register button after entering admin details
        // Add a small delay to allow for form submission
        try {
            Thread.sleep(1000); // Adjust the sleep duration as needed
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    @Then("the {anyString} will be created and a alert message will pop out notifying admin has been created")
    public void adminCreatedSuccessfully(String role) {
        String expectedAlertMessage = "Admin user has been successfully created!";
        String actualAlertMessage = add.getAlertText();
        assertEquals(expectedAlertMessage, actualAlertMessage);
        add.closeBrowser();
    }

}
