==========================
jsdoc-toolkit-rst-template
==========================

Installation
============
Suggested installation steps (unless you already have some of the apps/modules installed)

#.  **Install Java and Ant**:

    - Download Java and extract it for example to /opt/java/
    - Download Ant and extract it for example to /opt/apache-ant/

#.  **Install JsDoc Toolkit**:

    - Download release: http://jsdoc-toolkit.googlecode.com/files/jsdoc_toolkit-2.4.0.zip
    - Extract package for example to: /opt/jsdoc-toolkit/

#.  **Setup JsDoc Toolkit RST Template (this project)**:

    - Checkout the sources (package will be available as soon as 0.1 is out)
    - Open build.properties for editing and set the directories:

      - Where to find JsDoc Toolkit
      - Where to read javascript sources
      - Where to generate rst documents::

          # Directory where the jsdoc-toolkit is installed
          jsdoc-toolkit.dir=/opt/jsdoc-toolkit

          # Directory where to find javascript sources
          js.src.dir=src/js

          # Directory where to generate rst files
          js.rst.dir=dist/rst

#.  **Test the setup** to ensure everything works:

    - List Ant tasks::

        ant -p

    - Try out the js conversion by building the .js -sources::

        ant build

    - See the outcode directory defined by js.rst.dir

    .. NOTE:: 

        This document only describes how to generate RST-files from JavaScript -sources. Please follow the Sphinx -official documentation for how to write and configure documentation.

Usage
=====
Template can be used normally with jsdoc-tookit::

  java -Djsdoc.dir=/path/to/jsdoc-toolkit -Djsdoc.template.dir=/path/to/rst/template \
  -jar /path/to/jsdoc-toolkit/jsrun.jar /path/to/jsdoc-toolkit/app/run.js [SRCDIR/SRCFILE]

However, this project also comes with Ant script file that can be used for compiling JavaScript files into RST - and into html/pdf/whatever with Sphinx::

  ant build
  ant doc

Code
----
Javascript source code, commented using jsdoc-toolkit keywords::

  /**
  * @class
  * Comment block
  *
  * @param {string} name Unique name for the app
  */
  var App = function (name) {
    // @default "Anonymous"
    this.name = name || 'Anonymous';
  };

Generated document
------------------
After generating the source code with custom template, the outcome is something like::

  .. js:class:: App (name)

      Comment block

      :param string name:

          Unique name for the app

Document
--------
Now, both generated and manually written documentation can be used together.

The application is implemented in class :js:class:`App`.
To see the complete API, see :ref:`separate API document <api>`