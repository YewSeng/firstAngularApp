package stepdefinitions;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import Pages.ContactPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class ContactUsSteps {

    private WebDriver driver;
    private ContactPage contactPage;
    private String alertMessage;

    @Given("User is on the contact page")
    public void userIsOnContactPage() {
        driver = new ChromeDriver();
        contactPage = new ContactPage(driver);
        contactPage.navigateToContactPage();
    }

    @When("User enters contact details")
    public void userEntersContactDetails() {
        String name = "John Doe";
        String email = "johndoe@example.com";
        String enquiries = "This is a test enquiry.";

        alertMessage = contactPage.enterContactDetails(name, email, enquiries);
    }

    @When("User clicks the submit button")
    public void userClicksSubmitButton() {
        // This step is already covered in the previous step
    }

    @Then("User A success alert should be displayed with the message {string}")
    public void successAlertDisplayed(String expectedMessage) {
        assertEquals(expectedMessage, alertMessage);
    }

    @When("User closes the browser")
    public void userClosesBrowser() {
        contactPage.closeBrowser();
    }
}
