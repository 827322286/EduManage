package org.jit.sose.test.util;

import org.jit.sose.util.StringUtil;

public class StringUtilTest {

	public static void main(String[] args) {
		String servletPath = "manage/courseInfo.html";
//		String servletPath = "config/eecstate.html";
		String underscorePath = "";
		underscorePath = StringUtil.underscoreName(servletPath, ".html");
		System.out.println(underscorePath);
	}

}
