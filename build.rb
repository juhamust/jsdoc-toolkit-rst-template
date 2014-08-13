#!/usr/bin/env ruby

# Temporary build file to preview Github renderer outcome
$LOAD_PATH.unshift File.dirname(__FILE__) + "/../lib"
require 'github/markup'

output = File.new('README.html', 'w+')
output << GitHub::Markup.render('README.rst')