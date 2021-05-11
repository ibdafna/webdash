install_pyodide:
	git clone git@github.com:pyodide/pyodide.git; \
	cd pyodide; \
	git checkout 0.17.0;

pyodide: install_pyodide
	cd pyodide; \
	git apply ../patches/webdash.patch;

copy_build:
	cd dist; \
	cp -r ../pyodide/build/*.* .;

delete_dist:
	rm -rf dist;

make_dist:
	mkdir dist;

clean: delete_dist make_dist
	rm -rf .cache

webdash_build:
	npm run build;

fetch_prebuilt: 
	cd dist; \
	git clone https://github.com/ibdafna/webdash_dist; \
	mv ./webdash_dist/*.* .; \
	rm -rf webdash_dist;

setup: webdash_build fetch_prebuilt