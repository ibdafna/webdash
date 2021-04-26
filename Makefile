install_pyodide:
	git clone git@github.com:pyodide/pyodide.git; \
	cd pyodide; \
	git checkout 0.16.1;

pyodide: install_pyodide
	cd pyodide; \
	git apply ../patches/webdash.patch;

clean:
	rm -rf pyodide dist;