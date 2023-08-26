package stepdefinitions;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Map;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.AdminUpdateMeetingPage;
import Pages.ClientUpdateMeetingPage;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class ClientUpdateMeetingSteps {

    private WebDriver driver;
    private ClientUpdateMeetingPage clientUpdateMeetingPage;

    @Given("update Client is on the login page")
    public void clientIsOnLoginPage() {
        driver = new ChromeDriver();
        clientUpdateMeetingPage = new ClientUpdateMeetingPage(driver);
        clientUpdateMeetingPage.navigateToHome();
    }

    @When("update Client enters username {string} and password {string}")
    public void clientEntersUsernameAndPassword(String username, String password) {
        String clientDashboardTitle = clientUpdateMeetingPage.clientLogin(username, password);
        assertEquals("Client Dashboard", clientDashboardTitle);
    }

    @When("update Client clicks the login button")
    public void clientClicksLoginButton() {
        // No additional method added, as requested
    }

    @Then("update Client should be redirected to the admin homepage")
    public void clientShouldBeRedirectedToAdminHomepage() {
        // No additional method added, as requested
    }

    @When("update Client clicks on the \"View Meeting\" button")
    public void clientClicksViewMeetingButton() {
        clientUpdateMeetingPage.goToViewMeetingPage();
    }

    @When("update Client goes to the update clients page")
    public void clientGoesToUpdateClientsPage() {
        clientUpdateMeetingPage.goToUpdateMeetingPage();
    }

    @When("update Client updates the meeting with the following details:")
    public void clientUpdatesMeetingDetails(DataTable dataTable) {
        List<Map<String, String>> data = dataTable.asMaps(String.class, String.class);
        Map<String, String> meetingData = data.get(0);

        clientUpdateMeetingPage.editMeeting(
            meetingData.get("Topic"),
            meetingData.get("Start Date"),
            meetingData.get("Start Time"),
            meetingData.get("End Date"),
            meetingData.get("End Time"),
            meetingData.get("Parties Involved")
        );
    }

    @Then("A update Client success alert should be displayed with the message {string}")
    public void clientVerifySuccessAlert(String expectedMessage) {
        String actualAlertMessage = clientUpdateMeetingPage.getAlertMessage();
        assertEquals(expectedMessage, actualAlertMessage);
    }

    @When("update Client closes the browser")
    public void clientClosesBrowser() {
        clientUpdateMeetingPage.closeBrowser();
    }
}
