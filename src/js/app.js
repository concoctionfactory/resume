var GenericModel = Backbone.Model.extend({
	defaults:function(){
	},//default
});



var ResumeCollection = Backbone.Collection.extend({
	model:GenericModel,
	url:"json/projects.json",
});



var SectionView = Backbone.View.extend({
	initialize:function(options){
		var self = this;
		this.template = options.template;
		this.element = options.element;
	},
	render: function(){
		console.log("render project model", this.model);
		var template = _.template($(this.template).html());
		var html = template(this.model);
		this.$el.html(html);
		//console.log($(this.element).length);
		$(this.element).append(html);
	},//render
});




var ResumeView= Backbone.View.extend({
	render:function(){
		var self = this;
		var object =this.collection.at(0);

		var sectionRender = function(section,sectionTemplate, sectionElement){
			section.forEach(function(obj){
			//	console.log(sectionElement);
				var sectionView = new SectionView({model:obj,template:sectionTemplate, element:sectionElement });
				sectionView.render();
			});
		};

		var contactData = [object.get("contact")];
		var contactTemplate ="#ContactTemplate";
		var contactElement =".contact-container";
		sectionRender(contactData,contactTemplate,contactElement);

		var workData = object.get("work");
		var workTemplate ="#WorkTemplate";
		var workElement =".work-container";
		sectionRender(workData,workTemplate,workElement);

		var educationData = object.get("education");
		var educationTemplate ="#EducationTemplate";
		var educationElement =".education-container";
		sectionRender(educationData,educationTemplate,educationElement);

		var programSkillData = object.get("skills").programming;
		var programSkillTemplate ="#SkillTemplate";
		var programSkillElement =".program-skills-container";
		sectionRender(programSkillData,programSkillTemplate,programSkillElement);

		var otherSkillData = object.get("skills").other;
		var otherSkillTemplate ="#SkillTemplate";
		var otherSkillElement =".other-skills-container";
		sectionRender(otherSkillData,otherSkillTemplate,otherSkillElement);
	}
});



var resume = new ResumeCollection();

resume.fetch({
	success:function(){
		console.log(resume);
		var resumeView = new ResumeView({ el:"#thumbnails", collection:resume});
		resumeView.render();
	}
});
