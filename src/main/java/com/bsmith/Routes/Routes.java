package com.bsmith.Routes;

import spark.Spark;
import spark.template.freemarker.FreeMarkerEngine;

public class Routes {

    public static void setEndpoints(FreeMarkerEngine engine) {
        Spark.get("/", new IndexHandler(), engine);

    }
}
