install_pyodide:
	git clone git@github.com:pyodide/pyodide.git; \
	cd pyodide; \
	git checkout 0.18.1;

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
	cd webdash_dist; \
	git checkout webdash_0.0.2; \
	cd ..;\
	mv ./webdash_dist/*.* .; \
	rm -rf webdash_dist;

setup: webdash_build fetch_prebuilt