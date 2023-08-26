package stepdefinitions;

import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Map;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.ClientAddMeetingPage;
import io.cucumber.datatable.DataTable;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class ClientAddMeetingSteps {

    private WebDriver driver;
    private ClientAddMeetingPage clientAddMeetingPage;
    
    @Given("Client is on the login page")
    public void clientIsOnLoginPage() {
        driver = new ChromeDriver();
        clientAddMeetingPage = new ClientAddMeetingPage(driver);
        clientAddMeetingPage.navigateToHome();
    }

    @When("Client enters username {string} and password {string}")
    public void clientEntersUsernameAndPassword(String username, String password) {
        String clientDashboardTitle = clientAddMeetingPage.clientLogin(username, password);
        assertEquals("Client Dashboard", clientDashboardTitle);
    }

    @When("Client clicks the login button")
    public void clientClicksLoginButton() {
        // No additional method added, as requested
    }

    @Then("Client should be redirected to the admin homepage")
    public void clientShouldBeRedirectedToAdminHomepage() {
        // No additional method added, as requested
    }

    @When("Client clicks on the \"Create Meeting\" button")
    public void clientClicksCreateMeetingButton() {
        clientAddMeetingPage.goToCreateMeetingPage();
    }

    @When("Client enters the following details:")
    public void clientEntersMeetingDetails(DataTable dataTable) {
        List<Map<String, String>> data = dataTable.asMaps(String.class, String.class);
        Map<String, String> meetingData = data.get(0);

        clientAddMeetingPage.createMeeting(
            meetingData.get("Topic"),
            meetingData.get("Start Date"),
            meetingData.get("Start Time"),
            meetingData.get("End Date"),
            meetingData.get("End Time"),
            meetingData.get("Parties Involved")
        );
    }

    @When("Client clicks on the \"Create\" button")
    public void clientClicksCreateButton() {
        // No additional method added, as requested
    }

    @Then("A client success alert should be displayed with the message {string}")
    public void clientVerifySuccessAlert(String expectedMessage) {
        String actualAlertMessage = clientAddMeetingPage.getAlertMessage();
        assertEquals(expectedMessage, actualAlertMessage);
    }

    @When("Client closes the browser")
    public void clientClosesBrowser() {
        clientAddMeetingPage.closeBrowser();
    }
}
