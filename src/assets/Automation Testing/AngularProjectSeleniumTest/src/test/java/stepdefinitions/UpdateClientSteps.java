package stepdefinitions;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import Pages.UpdateClientPage;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class UpdateClientSteps {

    private WebDriver driver;
    private String dashboardTitle;
    private UpdateClientPage updateClientPage;

    @Given("^the \\[update\\]admin is on the login page$")
    public void updateAdminIsOnLoginPage() {
        driver = new ChromeDriver();
        updateClientPage = new UpdateClientPage(driver);
        updateClientPage.navigateToHome();
    }

    @When("^the \\[update\\]admin logs in with valid credentials$")
    public void updateAdminLogsIn() {
        dashboardTitle = updateClientPage.adminLogin("Anna Tan (Test)", "A@12345678");
        assertEquals("Admin Dashboard", dashboardTitle);
    }

    @When("^the \\[update\\]admin navigates to the view clients page$")
    public void updateAdminNavigatesToViewClientsPage() {
        updateClientPage.goToViewClientsPage();
    }

    @When("^the \\[update\\]admin goes to the update client page$")
    public void updateAdminGoesToUpdateClientPage() {
        updateClientPage.goToUpdateClientsPage();
    }

    @When("^the \\[update\\]admin updates client information with valid data$")
    public void updateAdminUpdatesClientInformation() {
        updateClientPage.updateClientDetails("Updated Client Name", "updated@example.com", "Updated Address", "12345", "updated_user", "Updated@12345678");
    }

    @When("^the \\[update\\]admin clicks on the \"Update Client\" button$")
    public void updateAdminClicksUpdateClientButton() {
        updateClientPage.clickUpdateClientButton();
    }

    @Then("^the \\[update\\]success message should be displayed$")
    public void updateSuccessMessageShouldBeDisplayed() {
        String alertMessage = updateClientPage.getAlertText();
        assertTrue(alertMessage.contains("Client user has been successfully updated!"));
    }
    
    @And("^the \\[update\\]admin logs out$")
    public void updateAdminLogsOut() {
        updateClientPage.adminLogsOut();
    }

    @When("^the \\[update\\]client logs in with updated valid credentials$")
    public void updateClientLogsInWithUpdatedCredentials() {
        dashboardTitle = updateClientPage.verifyUpdatedClientLogin("updated_user", "Updated@12345678");
        assertEquals("Client Dashboard", dashboardTitle);
    }

    @And("^the \\[update\\]client is on the login page$")
    public void updateClientIsOnLoginPage() {
        // Assuming the client is already on the login page
    }

    @And("^the \\[update\\]client navigates to the client dashboard$")
    public void updateClientNavigatesToDashboard() {
        // Assuming the client has already navigated to the dashboard
        driver.quit(); // Close the browser after the scenario
    }

    @Then("^the \\[update\\]updated client dashboard title should be displayed$")
    public void updatedClientDashboardTitleShouldBeDisplayed() {
        String clientDashboardTitle = updateClientPage.getClientDashboardTitle();
        assertEquals("Client Dashboard", clientDashboardTitle);
        updateClientPage.closeBrowser();
    }
}
