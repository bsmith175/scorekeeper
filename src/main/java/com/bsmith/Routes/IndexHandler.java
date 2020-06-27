package com.bsmith.Routes;

import com.google.common.collect.ImmutableMap;
import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.TemplateViewRoute;

import java.util.Map;

public class IndexHandler implements TemplateViewRoute {
    @Override
    public ModelAndView handle(Request req, Response res) {
        Map<String, Object> variables = ImmutableMap.of("title",
                "Stars: Query the database", "message", "", "results", "");
        return new ModelAndView(variables, "neighbors.ftl");
    }
}