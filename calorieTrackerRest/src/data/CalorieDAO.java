package data;

import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import entities.Tracker;

public interface CalorieDAO {

	public List<Tracker> index();
	public Tracker show(int id);
	public Tracker create(Tracker t);
	public Tracker update(int id, Tracker quiz);
	public boolean destroy(int id);
	}

