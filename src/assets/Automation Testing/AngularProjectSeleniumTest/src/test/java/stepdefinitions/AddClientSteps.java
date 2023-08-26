package stepdefinitions;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import Pages.AddClientPage;

public class AddClientSteps {

    private WebDriver driver;
    private AddClientPage addClientPage;
    private String dashboardTitle;
    private String alertText;

    @Given("^the admin is on the login page$")
    public void addAdminIsOnLoginPage() {
        driver = new ChromeDriver();
        addClientPage = new AddClientPage(driver);
        addClientPage.navigateToHome();
    }

    @When("^the admin logs in with valid credentials$")
    public void addAdminLogsIn() {
        dashboardTitle = addClientPage.adminLogin("Anna Tan (Test)", "A@12345678");
        assertEquals("Admin Dashboard", dashboardTitle);
    }

    @And("^the admin navigates to the admin dashboard$")
    public void addAdminNavigatesToDashboard() {
        // No need to implement here, it's already done in the previous step
    }

    @And("^the admin clicks on the \"Create Clients\" button$")
    public void addAdminClicksCreateClientsButton() {
        addClientPage.goToCreateClientForm();
    }

    @And("^the admin fills in valid client information$")
    public void addAdminFillsInClientInformation() {
        addClientPage.enterClientDetails("Simplilearn", "simplilearn@example.com", "#14-302, The Plaza, 7500A Beach Rd", "123456", "[Test] Karthik", "Test@12345678");
    }

    @And("^the admin clicks on the \"REGISTER CLIENT\" button$")
    public void addAdminClicksRegisterClientButton() {
        addClientPage.clickRegisterClientButton();
    }

    @Then("^the success message for client creation should be displayed$")
    public void addSuccessMessageForClientCreationShouldBeDisplayed() {
        alertText = addClientPage.getAlertText();
        assertTrue(alertText.contains("Client user has been successfully created!"));
    }
    
    @And("^the admin logs out")
    public void addAdminLogout() {
    	addClientPage.adminLogsOut();
    }

    @Given("^the client is on the login page$")
    public void addClientIsOnLoginPage() {
        driver.navigate().to("http://localhost:4200/home"); // Assuming the client's login page URL
    }

    @When("^the client logs in with valid credentials$")
    public void addClientLogsIn() {
        dashboardTitle = addClientPage.verifyClientLogin("[Test] Karthik", "Test@12345678");
        assertEquals("Client Dashboard", dashboardTitle);  
    }

    @And("^the client navigates to the client dashboard$")
    public void addClientNavigatesToDashboard() {
    	assertEquals("Client Dashboard", dashboardTitle);
    }
    
    @Then("^the client dashboard title should be displayed$")
    public void addClientDashboardTitleShouldBeDisplayed() {
        String clientDashboardTitle = addClientPage.getClientDashboardTitle();
        assertEquals("Client Dashboard", clientDashboardTitle);
        addClientPage.closeBrowser();
    }
}


