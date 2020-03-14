package com.revature.aspects;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
	private static final Logger LOGGER = LogManager.getLogger(LoggingAspect.class);
	
	@AfterReturning("execution(* com.revature.service.*.*(..))")
	public void after(JoinPoint joinPoint) {
		LOGGER.info("Method succesfuly returned ", joinPoint);
	}

}
