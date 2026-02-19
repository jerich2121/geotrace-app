const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getHistory = async (req, res) => {
  try {
    const history = await prisma.searchHistory.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return res.status(200).json({ history });
  } catch (error) {
    console.error('Get history error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addHistory = async (req, res) => {
  try {
    const { ipAddress, label } = req.body;

    if (!ipAddress) {
      return res.status(400).json({ message: 'IP address is required' });
    }

    // Avoid duplicate consecutive entries
    const latest = await prisma.searchHistory.findFirst({
      where: { userId: req.user.id, ipAddress },
      orderBy: { createdAt: 'desc' },
    });

    let entry;
    if (latest) {
      // Update timestamp instead of creating duplicate
      entry = await prisma.searchHistory.update({
        where: { id: latest.id },
        data: { createdAt: new Date(), label: label || null },
      });
    } else {
      entry = await prisma.searchHistory.create({
        data: {
          userId: req.user.id,
          ipAddress,
          label: label || null,
        },
      });
    }

    return res.status(201).json({ entry });
  } catch (error) {
    console.error('Add history error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'IDs array is required' });
    }

    await prisma.searchHistory.deleteMany({
      where: {
        id: { in: ids },
        userId: req.user.id,
      },
    });

    return res.status(200).json({ message: 'Entries deleted successfully' });
  } catch (error) {
    console.error('Delete history error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getHistory, addHistory, deleteHistory };
