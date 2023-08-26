package stepdefinitions;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import Pages.DeleteClientPage;
import io.cucumber.java.en.*;

public class DeleteClientSteps {

    private WebDriver driver;
    private DeleteClientPage deleteClientPage;

    @Given("the admin user is logged in")
    public void adminUserIsLoggedIn() {
        // Initialize the WebDriver and login as admin
        driver = new ChromeDriver();
        deleteClientPage = new DeleteClientPage(driver); // Initialize the page object
        deleteClientPage.navigateToHome();
        String adminDashboardTitle = deleteClientPage.adminLogin("Anna Tan (Test)", "A@12345678");
        assertEquals("Admin Dashboard", adminDashboardTitle);
    }

    @When("the admin user clicks on the \"View Clients\" button")
    public void adminClicksOnViewClientsButton() {
        deleteClientPage.goToViewClientsPage();
    }

    @When("the admin user clicks on the \"Delete\" button for the client")
    public void adminClicksOnDeleteButton() {
        // Assume client ID is known or extracted from the table
        int clientId = 12; 
        deleteClientPage.deleteClient("updated_user");
    }

    @When("the admin user logs out")
    public void adminLogsOut() {
        deleteClientPage.adminLogsOut();
        driver.quit();
    }

    @When("the deleted client attempts to log in")
    public void deletedClientAttemptsToLogIn() {
    	//below
    }

    @Then("the client receives an alert message {string}")
    public void clientReceivesAlertMessage(String expectedAlertMessage) {
        String alertMessage = deleteClientPage.attemptToLoginToDeletedClientAccount("updated_user", "Updated@12345678");
        // Compare the actual alert message with the expected message
        assertEquals("Error verifying client", alertMessage);
        deleteClientPage.closeBrowser();
    	
    }
    
}
