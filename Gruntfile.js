module.exports = function(grunt) {
    
    var fs = require('fs');
    fs.readdir('./html/posts/', function (err, files) {
        var aReuslt = [];
        files.forEach(function (value,index,arr) {
            if (/\.html$/.test(value)) {
                aReuslt.push('html/posts/' + value);
            }
        })
        fs.writeFileSync('./html/data.js', 'showlist('+JSON.stringify(aReuslt)+')');
    })
    grunt.initConfig({
        watch: {
            cndoc: {
              files: ['./posts/*.md'],
              tasks: ['markdown:posts']
            }
        },
        markdown: {
            posts: {
                files: [
                    {
                        expand: true,
                        src: 'posts/*.md',
                        dest: './html',
                        ext: '.html'
                    }
                ],
                options: {
                    template: 'static/layout.tpl',
                    preCompile: function(src, context) {
                        src.replace(/<\!--\_PAGEDATA([\s\S]*)?\_PAGEDATA-->/, function () {
                            var data = JSON.parse(arguments[1]);
                            for (var i in data) {
                                context[i] = data[i];
                            }
                        })
                    },
                    postCompile: function(src, context) {

                    },
                    templateContext: {},
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.registerTask('default', ['watch','markdown:posts']);
    
};