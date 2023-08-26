package AngularProject;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;

@RunWith(Cucumber.class)
@CucumberOptions(
		features = "src/test/java/resources/features",
		glue = "stepdefinitions",
		plugin = {"pretty", "html:target/cucumber-reports"},
		publish = true,
		dryRun = true
		)
public class ClientAddMeetingTest {

}
