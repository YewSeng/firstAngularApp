package stepdefinitions;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Map;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.AdminUpdateMeetingPage;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class AdminUpdateMeetingSteps {

    private WebDriver driver;
    private AdminUpdateMeetingPage adminUpdateMeetingPage;

    @Given("update Admin is on the login page")
    public void adminIsOnLoginPage() {
        driver = new ChromeDriver();
        adminUpdateMeetingPage = new AdminUpdateMeetingPage(driver);
        adminUpdateMeetingPage.navigateToHome();
    }

    @When("update Admin enters username {string} and password {string}")
    public void adminEntersUsernameAndPassword(String username, String password) {
        String adminDashboardTitle = adminUpdateMeetingPage.adminLogin(username, password);
        assertEquals("Admin Dashboard", adminDashboardTitle);
    }

    @When("update Admin clicks the login button")
    public void adminClicksLoginButton() {
        // No additional method added, as requested
    }

    @Then("update Admin should be redirected to the admin homepage")
    public void adminShouldBeRedirectedToAdminHomepage() {
        // No additional method added, as requested
    }

    @When("update Admin clicks on the \"View Meeting\" button")
    public void adminClicksViewMeetingButton() {
        adminUpdateMeetingPage.goToViewMeetingPage();
    }

    @When("update Admin goes to the update clients page")
    public void adminGoesToUpdateClientsPage() {
        adminUpdateMeetingPage.goToUpdateMeetingPage();
    }

    @When("update Admin updates the meeting with the following details:")
    public void adminUpdatesMeetingDetails(DataTable dataTable) {
        List<Map<String, String>> data = dataTable.asMaps(String.class, String.class);
        Map<String, String> meetingData = data.get(0);

        adminUpdateMeetingPage.editMeeting(
            meetingData.get("Topic"),
            meetingData.get("Start Date"),
            meetingData.get("Start Time"),
            meetingData.get("End Date"),
            meetingData.get("End Time"),
            meetingData.get("Parties Involved")
        );
    }

    @Then("A update Admin success alert should be displayed with the message {string}")
    public void adminVerifySuccessAlert(String expectedMessage) {
        String actualAlertMessage = adminUpdateMeetingPage.getAlertMessage();
        assertEquals(expectedMessage, actualAlertMessage);
    }

    @When("update Admin closes the browser")
    public void adminClosesBrowser() {
        adminUpdateMeetingPage.closeBrowser();
    }
}
