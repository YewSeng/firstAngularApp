package stepdefinitions;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Map;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.AdminAddMeetingPage;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class AdminAddMeetingSteps {

    private WebDriver driver;
    private AdminAddMeetingPage adminAddMeetingPage;

    @Given("Admin is on the login page")
    public void adminIsOnLoginPage() {
        driver = new ChromeDriver();
        adminAddMeetingPage = new AdminAddMeetingPage(driver);
        adminAddMeetingPage.navigateToHome();
    }

    @When("Admin enters username {string} and password {string}")
    public void adminEntersUsernameAndPassword(String username, String password) {
        String adminDashboardTitle = adminAddMeetingPage.adminLogin(username, password);
        assertEquals("Admin Dashboard", adminDashboardTitle);
    }

    @When("Admin clicks the login button")
    public void adminClicksLoginButton() {
        // No additional method added, as requested
    }

    @Then("Admin should be redirected to the admin homepage")
    public void adminShouldBeRedirectedToAdminHomepage() {
        // No additional method added, as requested
    }

    @When("Admin clicks on the \"Create Meeting\" button")
    public void adminClicksCreateMeetingButton() {
        adminAddMeetingPage.goToCreateMeetingPage();
    }

    @When("Admin enters the following details:")
    public void adminEntersMeetingDetails(DataTable dataTable) {
        List<Map<String, String>> data = dataTable.asMaps(String.class, String.class);
        Map<String, String> meetingData = data.get(0);

        adminAddMeetingPage.createMeeting(
            meetingData.get("Topic"),
            meetingData.get("Start Date"),
            meetingData.get("Start Time"),
            meetingData.get("End Date"),
            meetingData.get("End Time"),
            meetingData.get("Parties Involved")
        );
    }

    @When("Admin clicks on the \"Create\" button")
    public void adminClicksCreateButton() {
        // No additional method added, as requested
    }

    @Then("A success alert should be displayed with the message {string}")
    public void verifySuccessAlert(String expectedMessage) {
        String actualAlertMessage = adminAddMeetingPage.getAlertMessage();
        assertEquals(expectedMessage, actualAlertMessage);
    }

    @When("Admin closes the browser")
    public void adminClosesBrowser() {
        adminAddMeetingPage.closeBrowser();
    }
}
