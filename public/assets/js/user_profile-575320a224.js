function modalFormCheckBox(e){let a=$(" .checkbox input",e);console.log("hi",a,e),a.click((function(){1==$(this).prop("checked")?$(".to-date").html("Present"):0==$(this).prop("checked")&&$(".to-date").html('<input type="number" name="toMonth" required placeholder="01">\n            <input type="number" name="toYear" required placeholder="2020">')}))}function modalFormCheckBox1(e){let a=$(`#${e.type}UpdateModal-${e.updatedObj._id}`),d=$(" .checkbox input",a);console.log("hi",d,a),d.click((function(){e.updatedObj.fromMonth?$(".from-date").html(`<input type="number" name="fromMonth" required value=${e.updatedObj.fromMonth}>\n                <input type="number" name="fromYear" required value=${e.updatedObj.fromYear}>`):$(".from-date").html('<input type="number" name="fromMonth" required placeholder="01">\n                <input type="number" name="fromYear" required placeholder="2020">'),1==$(this).prop("checked")?$(".to-date").html("Present"):0==$(this).prop("checked")&&(e.updatedObj.toMonth?$(".to-date").html(`<input type="number" name="toMonth" required value=${e.updatedObj.toMonth}>\n                <input type="number" name="toYear" required value=${e.updatedObj.toYear}>`):$(".to-date").html('<input type="number" name="toMonth" required placeholder="01">\n                <input type="number" name="toYear" required placeholder="2020">'))}))}function successAddWorkGrad(e){if(console.log(e),e.error)new Noty({theme:"relax",text:""+e.message,type:"error",layput:"topRight",timeout:1800}).show();else{let a,d,o;a="work"==e.data.type?"Work":"Grad",console.log("type self",a),$(`#add${a}FormModal`).modal("hide"),$(".modal-backdrop").remove(),$("body").removeClass("modal-open"),1==e.data.length&&("Work"==a?($(".profile-intro .first .accordion #collapseTwo .card-body").prepend(' <p data-toggle="modal" data-target="#viewWorkModal" style="cursor: pointer;">\n                        Workalholicness\n                </p>'),$("body").append('<div class="modal fade" id="viewWorkModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n                    <div class="modal-dialog" role="document">\n                    <div class="modal-content">\n                        <div class="modal-header" style="background: #D84315;">\n                        <h2 class="modal-title" id="exampleModalLabel">\n                            Workalholicness\n                        </h2>\n                        </div>\n                        <div class="modal-body">\n                                <ul>\n                                \n                                </ul>\n                        </div>\n                        \n                    </div>\n                    </div>\n                </div>')):($(".profile-intro .first .accordion #collapseThree .card-body").prepend(' <p data-toggle="modal" data-target="#viewGradModal" style="cursor: pointer;">\n                            Gradenation\n                    </p>'),$("body").append('<div class="modal fade" id="viewGradModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n                        <div class="modal-dialog" role="document">\n                        <div class="modal-content">\n                            <div class="modal-header" style="background: #8e144c;">\n                            <h2 class="modal-title" id="exampleModalLabel">\n                                Gradenation\n                            </h2>\n                            </div>\n                            <div class="modal-body">\n                                    <ul>\n                                      \n                                    </ul>\n                            </div>\n                            \n                        </div>\n                        </div>\n                    </div>'))),d="Work"==a?newListDOM(e.data.object):newListGradDOM(e.data.object),e.data.object.check?$(" .one-g",d).append("Present"):$(" .one-g",d).append(`${e.data.object.toMonth}/${e.data.object.toYear}`),e.data.object.descrpt&&d.append(`<div class="${e.data.type}-descrpt">\n                     ${e.data.object.descrpt}\n            </div>`),"Work"==a?($("#viewWorkModal .modal-dialog .modal-content .modal-body ul").prepend(d),o=updateWorkDOMModal(e.data.object)):($("#viewGradModal .modal-dialog .modal-content .modal-body ul").prepend(d),o=updateGradDOMModal(e.data.object)),e.data.object.check?($(" .modal-dialog .modal-content .modal-body .three-g .checkbox",o).attr("checked",!0),$(" .modal-dialog .modal-content .modal-body .one-g .to-date",o).html("Present")):($(" .modal-dialog .modal-content .modal-body .three-g .checkbox",o).attr("checked",!1),$(" .modal-dialog .modal-content .modal-body .one-g .to-date",o).html(`<input type="number" name="toMonth" required value=${e.data.object.toMonth}>\n            <input type="number" name="toYear" required value=${e.data.object.toYear}>`)),$("body").append(o),console.log("new update modal",o);let t,n=$(` .edit-${e.data.type}-calling`,d);console.log("edit button",n),updateWorkGradModal(n),t="work"==e.data.type?deleteWorkModalDOM(e.data.object):deleteGradModalDOM(e.data.object),$("body").append(t);let l=$(` .delete-${e.data.type}-calling`,d);deleteWorkGradModal(l),"work"==e.data.type?new Noty({theme:"relax",text:'Yay, Go for "Workalholicness"!',type:"success",layput:"topRight",timeout:1800}).show():new Noty({theme:"relax",text:'"Gradenation", it is!',type:"success",layput:"topRight",timeout:1800}).show()}}modalFormCheckBox($("#addWorkFormModal")),modalFormCheckBox($("#addGradFormModal"));let addWorkFunction=function(){console.log($("#addWorkFormModal form")),$("#addWorkFormModal form").submit((function(e){e.preventDefault(),$.ajax({type:"post",url:$("#addWorkFormModal form").prop("action"),data:$("#addWorkFormModal form").serialize(),success:successAddWorkGrad,error:function(e){console.log(e.responseText)}})}))};addWorkFunction();let newListDOM=function(e){return $(`<li id="work-${e._id}" class="work-list">\n    <div class="edit-work">\n    <a href="/users/workgrad/update-modal/?type=work&id=${e._id}" class="edit-work-calling"><i class="fas fa-pen-square"></i></a>\n    </div>\n    <div class="delete-work">\n        <a href="/users/workgrad/delete-modal/?type=work&id=${e._id}" class="delete-work-calling">\n            <i class="fas fa-minus-square"></i>\n        </a>\n    </div>\n    <div class="two-g">\n    <div style="width: 70%;">\n        <div class="title">\n            ${e.title}\n        </div>\n        <div class="company">\n            ${e.company}\n        </div>\n    </div>\n    <div class="one-g">\n        ${e.fromMonth}/${e.fromYear} to\n    </div>\n</div>\n</li>`)},updateWorkGradModal=function(e){console.log("after form",$(e)),$(e).click((function(a){a.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log(e.data),e.data.updatedObj.check?(console.log("check",$(`#${e.data.type}UpdateModal-${e.data.updatedObj._id} .modal-dialog .modal-content .modal-body .three-g .checkbox input`)),$(`#${e.data.type}UpdateModal-${e.data.updatedObj._id} .modal-dialog .modal-content .modal-body .three-g .checkbox input`).prop("checked",!0),$(`#${e.data.type}UpdateModal-${e.data.updatedObj._id} .modal-dialog .modal-content .modal-body .one-g .to-date`).html("Present")):($(`#${e.data.type}UpdateModal-${e.data.updatedObj._id} .modal-dialog .modal-content .modal-body .three-g .checkbox input`).prop("checked",!1),$(`#${e.data.type}UpdateModal-${e.data.updatedObj._id} .modal-dialog .modal-content .modal-body .one-g .to-date`).html(`<input type="number" name="toMonth" required value=${e.data.updatedObj.toMonth}>\n                    <input type="number" name="toYear" required value=${e.data.updatedObj.toYear}>`)),$(`#${e.data.type}UpdateModal-${e.data.updatedObj._id}`).modal("show"),modalFormCheckBox1(e.data),updateModalFormSubmit($(`#${e.data.type}UpdateModal-${e.data.updatedObj._id} form`))},error:function(e){console.log(e.responseText)}})}))},updateWorkDOMModal=function(e){return $(` <div class="modal fade update-work-modal" id="workUpdateModal-${e._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n    <div class="modal-dialog" role="document">\n      <div class="modal-content">\n        <div class="modal-header">\n          <h5 class="modal-title" id="exampleModalLabel">Wanna Update this?</h5>\n        </div>\n        <form action="/users/workgrad/update-work-grad" method="post">\n            <div class="modal-body">\n                    <input type="hidden" name="id" value=${e._id}>\n                    <input type="hidden" name="type" value="work">\n                    <div class="three-g">\n                        <div>\n                            <span>Title:</span>\n                            <input type="text" name="title" value=${e.title} required>\n                        </div>\n                        <div>\n                            <span>Company:</span>\n                            <input type="text" name="company" required value=${e.company}>\n                        </div>\n                        <div>\n                            <span>Description:</span>\n                            <textarea name="descrpt" onkeydown="autosize1(this)">${e.descrpt}</textarea>\n                        </div>\n                        <div class="checkbox">\n                            <input type="checkbox" name="check">\n                            <span>I am currently working in this role</span>\n                        </div>\n                    </div>\n                    <div class="one-g">\n                        <span>Date:</span>\n                        <div>\n                            <div class="from-date">\n                            <input type="number" name="fromMonth" required value=${e.fromMonth}>\n                            <input type="number" name="fromYear" required value=${e.fromYear}>\n                            </div>\n                            <div class="to-div">\n                            to  \n                            </div> \n                            <div class="to-date">\n                                \n                            </div>\n                        </div>\n                    </div>\n            </div>\n            <div class="modal-footer">\n                    <button type="submit" class="btn btn-info">\n                            Submit\n                    </button>\n                    <button data-dismiss="modal" class="btn btn-secondary">Dismiss</button>\n            </div>\n        </form>\n      </div>\n    </div>\n  </div>`)},updateModalFormSubmit=function(e){console.log("update form",$(e)),$(e).submit((function(a){a.preventDefault(),a.stopImmediatePropagation(),$.ajax({type:"post",url:$(e).prop("action"),data:$(e).serialize(),success:function(e){if(console.log(e),e.error)new Noty({theme:"relax",text:""+e.message,type:"error",layput:"topRight",timeout:1800}).show();else{let a;$(`#${e.data.type}UpdateModal-${e.data.object._id}`).modal("hide"),$(".modal-backdrop").remove(),$("body").removeClass("modal-open"),a="work"==e.data.type?newListDOM(e.data.object):newListGradDOM(e.data.object),e.data.object.check?$(" .one-g",a).append("Present"):$(" .one-g",a).append(`${e.data.object.toMonth}/${e.data.object.toYear}`),e.data.object.descrpt&&a.append(`<div class="${e.data.type}-descrpt">\n                                 ${e.data.object.descrpt}\n                        </div>`),$(`#${e.data.type}-${e.data.object._id}`).html(a.html());let d=$(`#${e.data.type}-${e.data.object._id} .edit-${e.data.type}-calling`);console.log("form se button",d),updateWorkGradModal(d);let o=$(`#${e.data.type}-${e.data.object._id} .delete-${e.data.type}-calling`);deleteWorkGradModal(o),new Noty({theme:"relax",text:"Welcome to Updatestan!",type:"success",layput:"topRight",timeout:1800}).show()}},error:function(e){console.log(e.responseText)}})}))},deleteWorkGradModal=function(e){console.log($(e)),$(e).click((function(a){a.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log(e.data.item._id),$(`#${e.data.type}DeleteModal-${e.data.item._id}`).modal("show"),deleteWorkGrad($(`#${e.data.type}DeleteModal-${e.data.item._id} .delete-${e.data.type}-button`))},error:function(e){console.log(e.responseText)}})}))},deleteWorkModalDOM=function(e){return $(`<div class="modal fade delete-work-warning" id="workDeleteModal-${e._id}" data-backdrop="static" >\n    <div class="modal-dialog" role="document">\n    <div class="modal-content">\n        <div class="modal-header">\n        <h2 class="modal-title">Withdraw this <i class="fas fa-mail-bulk"></i>?</h2>\n        </div>\n        <div class="modal-body">\n        <p>Are you sure you want to quit this information? </p>\n        </div>\n        <div class="modal-footer">\n            <a href="/users/workgrad/delete-work-grad/?type=work&id=${e._id}" class="delete-work-button">\n                Delete\n            </a>\n            <a data-dismiss="modal" class="discard-button">Discard</a>\n        </div>\n    </div>\n    </div>\n</div>`)},deleteGradModalDOM=function(e){return $(`<div class="modal fade delete-grad-warning" id="gradDeleteModal-${e._id}" data-backdrop="static" >\n    <div class="modal-dialog" role="document">\n    <div class="modal-content">\n        <div class="modal-header">\n        <h2 class="modal-title">Withdraw this <i class="fas fa-school"></i>?</h2>\n        </div>\n        <div class="modal-body">\n        <p>Are you sure you want to quit this information? </p>\n        </div>\n        <div class="modal-footer">\n            <a href="/users/workgrad/delete-work-grad/?type=grad&id=${e._id}" class="delete-grad-button">\n                Delete\n            </a>\n            <a data-dismiss="modal" class="discard-button">Discard</a>\n        </div>\n    </div>\n    </div>\n</div>`)},deleteWorkGrad=function(e){console.log($(e)),$(e).click((function(a){a.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){let a;console.log(e.data),a="work"==e.data.type?"Work":"Grad",$(`body #${e.data.type}DeleteModal-${e.data.obj._id}`).modal("hide"),$(`body #${e.data.type}DeleteModal-${e.data.obj._id}`).remove(),$(".modal-backdrop").remove(),$("body").removeClass("modal-open"),$(`#${e.data.type}-${e.data.obj._id}`).remove(),0==e.data.length&&(console.log("0"),$(`body #view${a}Modal`).modal("hide"),$(`body #view${a}Modal`).remove(),$(".modal-backdrop").remove(),$("body").removeClass("modal-open"),$(`body .delete-${a}-warning`).remove(),$(`body .update-${a}-modal`).remove(),"Work"==a?(console.log("work",$("#collapseTwo .card-body")),$("#collapseTwo .card-body p").remove(),$("#collapseTwo .card-body").prepend('<p data-toggle="modal" data-target="#addWorkFormModal" style="cursor: pointer;">Want to brag about it?</p>')):($("#collapseThree .card-body p").remove(),$("#collapseThree .card-body").prepend('<p data-toggle="modal" data-target="#addGradFormModal" style="cursor: pointer;">Wanna take this to academic mode?</p>'))),new Noty({theme:"relax",text:"Instructions do come true!",type:"success",layput:"topRight",timeout:1800}).show()},error:function(e){console.log(e.responseText)}})}))},addGradFunction=function(){console.log($("#addGradFormModal form")),$("#addGradFormModal form").submit((function(e){e.preventDefault(),$.ajax({type:"post",url:$("#addGradFormModal form").prop("action"),data:$("#addGradFormModal form").serialize(),success:successAddWorkGrad,error:function(e){console.log(e.responseText)}})}))};addGradFunction();let newListGradDOM=function(e){return $(`<li id="grad-${e._id}" class="grad-list">\n    <div class="edit-grad">\n    <a href="/users/workgrad/update-modal/?type=grad&id=${e._id}" class="edit-grad-calling"><i class="fas fa-pen-square"></i></a>\n    </div>\n    <div class="delete-grad">\n        <a href="/users/workgrad/delete-modal/?type=grad&id=${e._id}" class="delete-grad-calling">\n            <i class="fas fa-minus-square"></i>\n        </a>\n    </div>\n    <div class="two-g">\n    <div style="width: 70%;">\n        <div class="title">\n            <b>Remarks:</b> &nbsp; ${e.grade}\n        </div>\n        <div class="company">\n            ${e.school}\n        </div>\n    </div>\n    <div class="one-g">\n        ${e.fromMonth}/${e.fromYear} to\n    </div>\n</div>\n</li>`)},updateGradDOMModal=function(e){return $(` <div class="modal fade update-grad-modal" id="gradUpdateModal-${e._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n    <div class="modal-dialog" role="document">\n      <div class="modal-content">\n        <div class="modal-header">\n          <h5 class="modal-title" id="exampleModalLabel">Improvise this?</h5>\n        </div>\n        <form action="/users/workgrad/update-work-grad" method="post">\n            <div class="modal-body">\n                    <input type="hidden" name="id" value=${e._id}>\n                    <input type="hidden" name="type" value="grad">\n                    <div class="three-g">\n                        <div>\n                            <span>Percentage/Grade:</span>\n                            <input type="text" name="title" value=${e.grade} required>\n                        </div>\n                        <div>\n                            <span>School/College:</span>\n                            <input type="text" name="company" required value=${e.school}>\n                        </div>\n                        <div>\n                            <span>Description:</span>\n                            <textarea name="descrpt" onkeydown="autosize1(this)">${e.descrpt}</textarea>\n                        </div>\n                        <div class="checkbox">\n                            <input type="checkbox" name="check">\n                            <span>I am currently enrolled here</span>\n                        </div>\n                    </div>\n                    <div class="one-g">\n                        <span>Date:</span>\n                        <div>\n                            <div class="from-date">\n                            <input type="number" name="fromMonth" required value=${e.fromMonth}>\n                            <input type="number" name="fromYear" required value=${e.fromYear}>\n                            </div>\n                            <div class="to-div">\n                            to  \n                            </div> \n                            <div class="to-date">\n                                \n                            </div>\n                        </div>\n                    </div>\n            </div>\n            <div class="modal-footer">\n                    <button type="submit" class="btn btn-info">\n                            Submit\n                    </button>\n                    <button data-dismiss="modal" class="btn btn-secondary">Dismiss</button>\n            </div>\n        </form>\n      </div>\n    </div>\n  </div>`)},convertWorkToAjax=function(){$("#viewWorkModal .modal-dialog .modal-content .modal-body ul>li").each((function(){let e=$(this),a=$(" .edit-work-calling",e),d=$(" .delete-work-calling",e);updateWorkGradModal(a),deleteWorkGradModal(d)})),$("#viewGradModal .modal-dialog .modal-content .modal-body ul>li").each((function(){let e=$(this),a=$(" .edit-grad-calling",e),d=$(" .delete-grad-calling",e);updateWorkGradModal(a),deleteWorkGradModal(d)}))};convertWorkToAjax();