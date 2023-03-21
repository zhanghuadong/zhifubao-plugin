const _requestTools = {
    formatQueryString(queryString = '') {
        const result = {};
        if (queryString.length > 0) {
            queryString = queryString.split('?')[1].split('&');
            for (let kv of queryString) {
                kv = kv.split('=');
                if (kv[0]) result[kv[0]] = decodeURIComponent(kv[1]);
            }
        }
        return result
    }
}

function _initXMLHttpRequest() {
    // 拦截网络请求方法1
    const open = XMLHttpRequest.prototype.open;
    const _targetApiList = [
        'https://mbillexprod.alipay.com/enterprise/accountBailDetailQuery.json'
    ]
    /**
    XMLHttpRequest.prototype.open = function (...args) {
        this.addEventListener('load', function () {
            // 如果当前url并不包含_targetApiList中任意一个地址，则阻止后续操作
            if (!_targetApiList.find(item => this.responseURL.includes(item))) return

           

            const result = {
                responseHeaders: {},
                responseData: {},
                request: this,
                status: this.status,
                params: _requestTools.formatQueryString(this.responseURL)
            }
            // 格式化响应头
            this.getAllResponseHeaders().split("\r\n").forEach((item) => {
                const [key, value] = item.split(": ");
                if (key) result.responseHeaders[key] = value;
            });
            if (result.responseHeaders["content-type"].includes("application/json")) {
                // 如果响应头是content-type是json，则格式化响应体
                if (this.response?.length) result.responseData = JSON.parse(this.response);
            }

            _crawler.collectData(result)
        })

        return open.apply(this, args);
    };
    **/

    // 拦截网络请求方法2
    // 此处的方法拦截在目标网站中并没有遇到
    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
        let [resource, config] = args;
        //alert(JSON.stringify(resource));
        //通过这里来刷选
        // 如果当前url并不包含_targetApiList中任意一个地址，则阻止后续操作
        let intercept=false;
        let tryagain=false;
        if(resource.indexOf('https://mbillexprod.alipay.com/enterprise/accountBailDetailQuery.json')!=-1){
            intercept=true;
            tryagain=true;
            //alert(JSON.stringify(resource));
        }else{
            intercept=false;
        }
        let response = await originalFetch(resource, config);
        if (response.status === 200) {
            response
                .clone()
                .json()
                .then((data) => {
                    console.log('响应数据：', data)
                    if(intercept && data.result.detail.length>0){
                        //alert(JSON.stringify(data));
                        //收集起来
                        //_crawler.collectDataAccountBailDetailQuery(data,data.result.detail)
                         sendAjaxPost(resource,data.queryForm.billUserId,data.queryForm.startTime,data.queryForm.endTime);   
                    }
                    
                });
        }
 
        return response;
    };

}

function sendAjaxPost(url,billUserId,startTime,endTime){

    $.ajax({
                    async: false,
                    url: url,
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: 'JSON',
                    data: {
                        startTime: startTime,
                        endTime: endTime,
                        pageSize: '2000',
                        pageNum: 1,
                        sortType: '0',
                        billUserId: billUserId
                    },
                    cache: false,
                    xhrFields: { withCredentials: true },
                    crossDomain: true,
                    success: function (data) {
                        //console.log(data);
                        //alert(JSON.stringify(data));
                        _crawler.collectDataAccountBailDetailQuery(data,data.result.detail)
                         
                    },
                    error: function (e) {
                        alert(JSON.stringify(e));
                        console.log(e);
                    }
                });
}



_initXMLHttpRequest();