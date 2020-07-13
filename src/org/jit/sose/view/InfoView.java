package org.jit.sose.view;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 信息管理模块视图跳转<br>
 * 注意：<br>
 * 1、请求路径唯一，切勿与其他任何请求路径重复<br>
 * 2、请求返回的视图，切勿与其他任何请求路径重复<br>
 * 
 * @author: 王越
 * @date: 2019年4月18日 下午11:15:01
 */
@Controller
@RequestMapping(value = "/info")
public class InfoView {
	// 请求路径
	@RequestMapping(value = "/choice_course_no", method = RequestMethod.GET)
	public String choiceCourseNo() {
		// 视图名
		return "info/choiceCourseNo";
	}

	// 请求路径
	@RequestMapping(value = "/class_info", method = RequestMethod.GET)
	public String classInfo() {
		// 视图名
		return "info/classInfo";
	}

	// 请求路径
	@RequestMapping(value = "/school_info", method = RequestMethod.GET)
	public String schoolInfo() {
		// 视图名
		return "info/schoolInfo";
	}

	// 请求路径
	@RequestMapping(value = "/staff_info", method = RequestMethod.GET)
	public String staffInfo() {
		// 视图名
		return "info/staffInfo";
	}

	// 请求路径
	@RequestMapping(value = "/course_class_info", method = RequestMethod.GET)
	public String courseClassInfo() {
		// 视图名
		return "info/courseClassInfo";
	}

	// 请求路径
	@RequestMapping(value = "/student_info", method = RequestMethod.GET)
	public String studentInfo() {
		// 视图名
		return "info/studentInfo";
	}

	// 请求路径
	@RequestMapping(value = "/class_student", method = RequestMethod.GET)
	public String classStudent() {
		// 视图名
		return "info/classStudent";
	}
	
	// 请求路径
	@RequestMapping(value = "/question_bank", method = RequestMethod.GET)
	public String questionBank() {
		// 视图名
		return "info/questionBank";
	}
	
	// 请求路径
	@RequestMapping(value = "/achieve_degree", method = RequestMethod.GET)
	public String achieveDegree() {
		// 视图名
		return "info/achieveDegree";
	}
}
