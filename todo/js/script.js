$(function() {
    // 时间模块开始
    function getNowTime(obj) {
        var nowtime = new Date;
        var h = nowtime.getHours();
        var m = nowtime.getMinutes();
        var s = nowtime.getSeconds();
        h > 9 ? h : h = '0' + h;
        m > 9 ? m : m = '0' + m;
        s > 9 ? s : s = '0' + s;
        // 显示区域
        obj.html(h + ':' + m + ':' + s);
    }
    getNowTime($('.show_time'));
    setInterval(function() { getNowTime($('.show_time')) }, 1000);
    // 时间模块结束

    // 加载并设置音效
    var m = Number(localStorage.getItem('music'));
    $('.musicbtn').eq(m)[0].checked = 'checked';
    setmusic(m);

    //打开网站先渲染一次数据
    loadData();

    // 输入事件
    $('.inputtodo input').keyup(function(e) {
        if (e.key == 'Enter' && $(this).val() != '') {
            var data = getData();
            data.push({ content: $(this).val(), done: false });
            saveData(data);
            loadData();
            $(this).val('')
        }
    });

    // 点击创建按钮事件
    $('.inputtodo a').click(function() {
        if ($(this).siblings('input').val() != '') {
            var data = getData();
            data.push({ content: $(this).siblings('input').val(), done: false });
            saveData(data);
            loadData();
            $(this).siblings('input').val('')
        }
    });

    // 删除按钮事件
    $('ol,ul').on('click', 'li a', function() {
        var data = getData();
        data.splice($(this).attr('data-index'), 1)
        saveData(data);
        loadData();
    })

    // 复选框事件
    $('ol,ul').on('click', 'li input', function(e) {
        var data = getData();
        data[$(this).siblings('a').attr('data-index')].done = $(this).prop('checked');
        if ($(this).prop('checked')) {
            $('.music')[0].currentTime = 0;
            $('.music')[0].play();
        };
        saveData(data);
        loadData();
    });

    // 时间显示控制弹窗
    $('.show_time,.setwindow i').click(function() {
        $('.setwindow').slideToggle();
    });

    // 音效设置
    $('.musicbtn').change(function() {
        setmusic($(this).attr('data-index'));
        $('.music')[0].play();
        localStorage.setItem('music', $(this).attr('data-index'))
    });

    // 设置音效路径函数
    function setmusic(index) {
        if (index == 3) {
            $('.music').prop('src', '');
        } else {
            $('.music').prop('src', 'mp3/done' + index + '.mp3');
        }
    }

    // 获取数据
    function getData() {
        var data = localStorage.getItem('todolist');
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 渲染数据
    function loadData() {
        $('ol,ul').empty();
        data = getData();
        doingnum = 0;
        donenum = 0;
        $.each(data, function(i, n) {
            if (n.done) {
                $('ul').prepend('<li><input type="checkbox" checked><p>' + n.content + '</p><a href="javascript:;" data-index="' + i + '"><i class="fas fa-times-circle"></i></a></li>');
                donenum++;
            } else {
                $('ol').prepend('<li><input type="checkbox"><p>' + n.content + '</p><a href="javascript:;" data-index="' + i + '"><i class="fas fa-times-circle"></i></a></li>');
                doingnum++;
            }
        })
        $('.doingnum').text(doingnum);
        $('.donenum').text(donenum);
        donenum == 0 ? $('.listtitle').eq(1).css('display', 'none') : $('.listtitle').eq(1).css('display', 'flex');
    };

    // 保存数据
    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    };
})