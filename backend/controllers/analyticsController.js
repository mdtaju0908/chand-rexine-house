const DealerEnquiry = require('../models/DealerEnquiry.js');
const Dealer = require('../models/Dealer.js');
const Product = require('../models/Product.js');
const RetailEnquiry = require('../models/RetailEnquiry.js');

// @desc    Get analytics dashboard data
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
const getAnalyticsDashboard = async (req, res) => {
  try {
    // 1. Total Enquiries (Dealer + Retail)
    const totalDealerEnquiries = await DealerEnquiry.countDocuments();
    const totalRetailEnquiries = await RetailEnquiry.countDocuments();

    // 2. Active Dealers
    const activeDealers = await Dealer.countDocuments({ status: 'Active' });

    // 3. Conversion Rate (Active Dealers / Total Dealer Enquiries)
    const conversionRate = totalDealerEnquiries > 0
      ? ((activeDealers / totalDealerEnquiries) * 100).toFixed(1)
      : 0;

    // 4. Products Stats
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lt: 20 } }); // Assuming < 20 is low stock

    // 5. Recent Enquiries (Last 5)
    const recentEnquiries = await DealerEnquiry.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .select('agencyName city status createdAt');

    // 6. Top Cities (Aggregation)
    const topCities = await DealerEnquiry.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // 7. Enquiry Status Distribution
    const statusDistribution = await DealerEnquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      summary: {
        totalEnquiries: totalDealerEnquiries + totalRetailEnquiries,
        activeDealers,
        conversionRate,
        totalProducts,
        lowStockProducts,
      },
      recentEnquiries,
      charts: {
        topCities: topCities.map(c => ({ city: c._id, count: c.count })),
        statusDistribution: statusDistribution.map(s => ({ status: s._id, count: s.count })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAnalyticsDashboard,
};
