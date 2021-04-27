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

delete_dist:
	rm -rf dist;

make_dist:
	mkdir dist;

clean: delete_dist make_dist copy_build
	rm -rf .cache

webdash_build:
	npm run build;

all: clean webdash_build