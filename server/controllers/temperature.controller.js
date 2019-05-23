const Temperature = require('../models/temperature');

const temperatureCtrl = {};

temperatureCtrl.getLogs = async (req, res)=>{
    try {
        //throw "thrown message";
        const temperatures = await Temperature.find();
        res.json(temperatures);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

temperatureCtrl.getStatistics = async (req, res)=>{
    try {
        //throw "thrown message";
        const statistics = await Temperature.aggregate([
            { 
                $group: { 
                    _id : null,
                    total: { $sum: 1 },
                    avg: { $avg: "$value" },
                    max: { $max: "$value" },
                    min: { $min: "$value" }
                }
            }
        ]);
    
        var avg = 0;
        var max = 0;
        var min = 0;
        var median = 0;
    
        if (statistics.length > 0){
            const total = statistics[0].total;
            avg = statistics[0].avg;
            max = statistics[0].max;
            min = statistics[0].min;
    
            const skipRecords = total / 2;
        
            if (total == 1) {
                const record = await Temperature.findOne();
                median = record.value;
            }
            else if (total % 2) {
                const record = await Temperature.find().sort( {"value":1} ).skip(skipRecords).limit(1);
                median = record[0].value;
            }
            else{
                var middleRecords = await Temperature.find().sort( {"value":1} ).skip(skipRecords-1).limit(2);
                var num1 = middleRecords[0].value;
                var num2 = middleRecords[1].value;
                median = (num1 + num2) / 2;
            }
        }
        
        res.json({ 
            'average': avg,
            'highest': max,
            'lowest': min,
            'median': median 
        });
    }
    catch (e) {
        res.status(500).send(e.message);
    }    
}

temperatureCtrl.addLog = async (req, res)=>{
    try {
        //throw "thrown message";
        const temperature = new Temperature(req.body);
        await temperature.save();
        res.json({ message: 'Temperature log successfully saved' });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

temperatureCtrl.deleteLog = async (req, res)=>{
    try {
        //throw "thrown message";
        await Temperature.findByIdAndDelete(req.params.id);
        res.json({ message: 'Temperature log deleted' });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = temperatureCtrl;