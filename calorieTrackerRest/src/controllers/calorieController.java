package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.CalorieDAO;
import entities.Tracker;

@RestController
public class calorieController {
	
	@Autowired
	private CalorieDAO calorieDao;
	
	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path = "trackers", method = RequestMethod.GET)
	public List<Tracker> index() {
		return calorieDao.index();
	}
	@RequestMapping(path = "trackers/{id}", method = RequestMethod.GET)
	public Tracker show(@PathVariable int id) {
		return calorieDao.show(id);
	}
	@RequestMapping(path = "trackers", method = RequestMethod.POST)
	public Tracker create(@RequestBody String trackerJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		Tracker mappedTracker = null;
		try {
			mappedTracker = mapper.readValue(trackerJSON, Tracker.class);
			mappedTracker = calorieDao.create(mappedTracker);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mappedTracker;
		
	}
	@RequestMapping(path = "trackers/{id}", method = RequestMethod.PUT)
	public Tracker update(@PathVariable int id, @RequestBody String trackerJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
        Tracker updatedTracker = null;
        try {
        	updatedTracker = mapper.readValue(trackerJSON, Tracker.class);
        	updatedTracker = calorieDao.update(id, updatedTracker);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return updatedTracker;
        
    }

	@RequestMapping(path = "trackers/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		return calorieDao.destroy(id);
	}
}
