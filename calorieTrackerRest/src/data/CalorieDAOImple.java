package data;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletResponse;

import org.springframework.transaction.annotation.Transactional;

import entities.Tracker;

@Transactional
public class CalorieDAOImple implements CalorieDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Tracker> index() {
		String query = "SELECT t FROM Tracker t";
		return em.createQuery(query, Tracker.class).getResultList();

	}

	@Override
	public Tracker show(int id) {
		return em.find(Tracker.class, id);
	}

	@Override
	public Tracker create(Tracker t) {
		em.persist(t);
		em.flush();
		return t;
	}

	@Override
	public Tracker update(int id, Tracker t) {
		Tracker managed = null;
		try {
			managed = em.find(Tracker.class, id);
			managed.setCalories(t.getCalories());
			if (t.getFoodItem() != null) {
				managed.setFoodItem(t.getFoodItem());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(managed);
		return managed;
	}

	@Override
	public boolean destroy(int id) {
		try {
			Tracker managed = em.find(Tracker.class, id);
			em.remove(managed);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (em.find(Tracker.class, id) == null) {
			return true;
		}
		return false;
	}
	
	

}
