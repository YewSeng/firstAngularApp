package stepdefinitions;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import Pages.AdminDeleteMeetingPage;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class AdminDeleteMeetingSteps {

    private WebDriver driver;
    private AdminDeleteMeetingPage adminDeleteMeetingPage;

    @Given("delete Admin is on the login page")
    public void adminIsOnLoginPage() {
        driver = new ChromeDriver();
        adminDeleteMeetingPage = new AdminDeleteMeetingPage(driver);
        adminDeleteMeetingPage.navigateToHome();
    }

    @When("delete Admin enters username {string} and password {string}")
    public void adminEntersUsernameAndPassword(String username, String password) {
        adminDeleteMeetingPage.adminLogin(username, password);
    }

    @Then("delete Admin should be redirected to the admin homepage")
    public void adminShouldBeRedirectedToAdminHomepage() {
        // Verification of redirection can be done using appropriate WebDriver methods
    }

    @When("delete Admin clicks on the \"View Meeting\" button")
    public void adminClicksViewMeetingButton() {
        adminDeleteMeetingPage.goToViewMeetingPage();
    }

    @When("delete Admin goes to the delete meeting page")
    public void adminGoesToDeleteMeetingPage() {
        adminDeleteMeetingPage.deleteMeetingPage();
    }

    @Then("delete A confirmation alert should be displayed")
    public void adminConfirmationAlertDisplayed() {
        // Verifying confirmation alert can be done using ExpectedConditions and WebDriverWait
        Alert confirmationAlert = new WebDriverWait(driver, 10).until(ExpectedConditions.alertIsPresent());
        // Additional verifications can be added as needed
    }

    @Then("delete Admin confirms the deletion")
    public void adminConfirmsDeletion() {
        // Already handled in the page method, no additional action needed here
    }

    @Then("A delete success alert should be displayed with the message {string}")
    public void adminVerifySuccessAlert(String expectedMessage) {
        String actualAlertMessage = adminDeleteMeetingPage.deleteMeetingPage();
        assertEquals(expectedMessage, actualAlertMessage);
    }

    @When("delete Admin closes the browser")
    public void adminClosesBrowser() {
        adminDeleteMeetingPage.closeBrowser();
    }
}
