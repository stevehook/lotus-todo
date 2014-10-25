require 'spec_helper'
require 'app/entities/user'
require 'app/repositories/user_repository'
require 'app/config/mapper'

describe UserRepository do
  let(:bob) { User.new(name: 'Bob Roberts', email: 'bob@example.com') }
  let(:rob) { User.new(name: 'Rob Roberts', email: 'rob@example.com') }
  let(:users) { [bob, rob] }

  before do
    users.each { |user| UserRepository.persist(user) }
  end

  after do
    UserRepository.clear
  end

  describe '#find_by_email' do
    it 'returns the right user' do
      expect(described_class.find_by_email('rob@example.com')).to eq(rob)
    end

    it 'returns nil when there is no matching user' do
      expect(described_class.find_by_email('bobby@example.com')).to be_nil
    end
  end
end

