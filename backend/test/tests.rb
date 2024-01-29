require 'minitest/autorun'



class Tests < Minitest::Test

  def palindrome?(str)
    str == str.reverse
  end

  def test_palindrome
    assert_equal true, palindrome?('anona')
    assert_equal true, palindrome?('anoona')
    assert_equal true, palindrome?('level')
    assert_equal true, palindrome?('leveL')
    assert_equal true, palindrome?('LeveL')
    assert_equal false, palindrome?('')
    assert_equal false, palindrome?(' ')
    assert_equal false, palindrome?('nzicunzeucnize')
    assert_equal false, palindrome?('world')
  end


  def encode?(str)
    return ''
  end

  def test_encode
    assert_equal '3a3b3c', palindrome?('aaabbbccc')
    assert_equal '1a2b1c1a1b2c2b2a2c', palindrome?('abbcabccbbaacc')
    assert_equal '1a14b31c1a', palindrome?('abbbbbbbbbbbbbbccccccccccccccccccccccccccccccca')
  end

  def test_reverse_string
    assert_equal 'tac', reverse_string('cat')
    assert_equal 'racecar', reverse_string('racecar')
    assert_equal '', reverse_string('')
    assert_equal '6 ', reverse_string(' 6')
    assert_equal 'aHCAKAYUOB', reverse_string('BOUYAKACHa')
  end

  def test_factorial
    assert_equal 120, factorial(5)
    assert_equal 1, factorial(0)
    assert_equal 1, factorial(1)
    assert_equal 2, factorial(2)
    assert_equal 3, factorial(6)
  end


  def test_find_missing_number
    assert_equal 4, find_missing_number([1, 2, 3, 5])
    assert_equal 8, find_missing_number([1, 2, 3, 4, 5, 6, 7, 9, 10])
    find_missing_number([1, 2, 3, 4, 5])
  end
end


