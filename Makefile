install_pyodide:
	git clone git@github.com:pyodide/pyodide.git; \
	cd pyodide; \
	git checkout 0.17.0;

pyodide: install_pyodide
	cd pyodide; \
	git apply ../patches/webdash_0_17_x.patch;

copy_build:
	cd dist; \
	cp -r ../pyodide/build/*.* .;

clean:
	rm -rf pyodide dist;