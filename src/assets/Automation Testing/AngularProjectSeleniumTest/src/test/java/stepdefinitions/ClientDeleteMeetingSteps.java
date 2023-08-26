package stepdefinitions;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import Pages.AdminDeleteMeetingPage;
import Pages.ClientDeleteMeetingPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class ClientDeleteMeetingSteps {

    private WebDriver driver;
    private ClientDeleteMeetingPage clientDeleteMeetingPage;

    @Given("delete Client is on the login page")
    public void clientIsOnLoginPage() {
        driver = new ChromeDriver();
        clientDeleteMeetingPage = new ClientDeleteMeetingPage(driver);
        clientDeleteMeetingPage.navigateToHome();
    }

    @When("delete Client enters username {string} and password {string}")
    public void adminEntersUsernameAndPassword(String username, String password) {
        clientDeleteMeetingPage.clientLogin(username, password);
    }

    @Then("delete Client should be redirected to the admin homepage")
    public void clientShouldBeRedirectedToAdminHomepage() {
        // Verification of redirection can be done using appropriate WebDriver methods
    }

    @When("delete Client clicks on the \"View Meeting\" button")
    public void clientClicksViewMeetingButton() {
        clientDeleteMeetingPage.goToViewMeetingPage();
    }

    @When("delete Client goes to the delete meeting page")
    public void clientGoesToDeleteMeetingPage() {
        clientDeleteMeetingPage.deleteMeetingPage();
    }

    @Then("delete Client A confirmation alert should be displayed")
    public void clientConfirmationAlertDisplayed() {
        // Verifying confirmation alert can be done using ExpectedConditions and WebDriverWait
        Alert confirmationAlert = new WebDriverWait(driver, 10).until(ExpectedConditions.alertIsPresent());
        // Additional verifications can be added as needed
    }

    @Then("delete Client confirms the deletion")
    public void clientConfirmsDeletion() {
        // Already handled in the page method, no additional action needed here
    }

    @Then("delete Client A delete success alert should be displayed with the message {string}")
    public void clientVerifySuccessAlert(String expectedMessage) {
        String actualAlertMessage = clientDeleteMeetingPage.deleteMeetingPage();
        assertEquals(expectedMessage, actualAlertMessage);
    }

    @When("delete Client closes the browser")
    public void clientClosesBrowser() {
        clientDeleteMeetingPage.closeBrowser();
    }
}