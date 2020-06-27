<#assign content>

<h1 align=center> CS32: Stars </h1>




</div>

<div class="row">
  <div class="column" >
      <h1 class="section">Neighbors Search</h1>
    <form id="neighborForm" method="POST" action="/neighbors">
    	<label for="k">Show me the </label>
    	<textarea cols=2 rows=1 name="k" id="k"></textarea>
    	<label for="target">nearest stars to</label>
    	<textarea cols=7 rows=1 name="target" id="target"></textarea>
    	<label >. </label>
    	<input type="submit"><br><br>
  </form>
  
  <h1>Radius Search</h1>
<form method="POST" action="/radius">
    <label for="target">Find stars nearest to  </label>
    <textarea cols=7 rows=1 name="target" id="target"></textarea>
    <label for="">within a radius of
    <textarea cols=2 rows=1 name="r" id="r"></textarea>
    <label cols=2 rows=1>. </label>
  <input type="submit"><br><br>
  <h1>Enter Star Data</h1>
</form>

<form method="POST"  action="/starscommand">
    <label for="text">Enter filename here: </label>
    <textarea cols=14 rows=1 name="text" id="text"></textarea>
  <input type="submit">
</form></p>
  </div>
  <div class="column">
    <h2>Query Results</h2>
    <p style="white-space: pre-line">   
    	${message}<br>
  		${results}</p>
  </div>
</div>

</#assign>
<#include "main.ftl">