package test;

import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Tracker;

public class TrackerTest {

	private EntityManager em = null;

	
	@Before
	public void setup() {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("calorieTracker");
				em = emf.createEntityManager();
	}
	
	
	@After
	public void tearDown() {
		if (em != null) {
			em.close();
		}
	}
	
	@Test
	public void test() {
	  boolean pass = true;
	  assertEquals(pass, true);
	}
	
	@Test
	public void can_pull_quiz_name_from_database() {
		String expectedNameOfFoodItem = "pizza";
		assertEquals(em.find(Tracker.class, 1).getFoodItem(), expectedNameOfFoodItem);
}
}
