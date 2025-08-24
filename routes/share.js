import Summary from "../models/Summary";

router.get('/share/:shareId',async (req,res)=>{
    try{
        const summary  = await Summary.findOne({shareId:req.params.shareId});
        if(!summary) return res.status(404).json({error : 'Summary not found'});
        res.json({
            summary:summary.summary,
            prompt: summary.prompt,
            comments:summary.comments || []
        });
       

        } catch(err){
            res.status(500).json({error : 'Server error'});
        
    }
})

router.post("/share/:shareId/comment",async(req,res)=>{
    try{
        const {name,text} = req.body;
        if(!text) return res.status(400).json({error :"Comment text required"});
        const summary = await Summary.findOne({sharId :req.params.shareId});
        if(!summary) return res.status(404).json({error:"Summary not found"});

        summary.comments.push({name,text});
        await summary.save();

        res.json({message:'Comment added successfully'});
    } catch(err){
        res.status(500).json({error:'Server error'});
    }
})

export default router;